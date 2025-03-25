import React, { useRef, useState } from 'react';
import './TeacherSchedule.css';
import * as XLSX from 'xlsx';
import { useSchedule } from '../../context/ScheduleContext';

const TeacherSchedule = () => {
    const { scheduleData, setScheduleData } = useSchedule();
    const fileInputRef = useRef(null);
    const [importError, setImportError] = useState('');

    const getCellContent = (dayIndex, slotIndex) => {
        const day = scheduleData.days[dayIndex].toLowerCase();
        const course = scheduleData.courses[day][slotIndex];
        if (course) {
            return (
                <div className="course-info">
                    <div className="course-name">{course.name}</div>
                    <div className="course-details">
                        <span className="course-type">{course.type}</span>
                        <span className="course-room">{course.room}</span>
                    </div>
                    <div className="course-professor">{course.professor}</div>
                </div>
            );
        }
        return null;
    };

    const getCellContentForExcel = (dayIndex, slotIndex) => {
        const day = scheduleData.days[dayIndex].toLowerCase();
        const course = scheduleData.courses[day][slotIndex];
        if (course) {
            return `${course.name}\n${course.type}\n${course.room}\n${course.professor}`;
        }
        return '[Empty]'; // Special marker for empty cells
    };

    const exportToExcel = () => {
        const wsData = [
            ['UNIVERSITY:', scheduleData.header.university],
            ['DEPARTMENT:', scheduleData.header.department],
            ['', ''],
            ['EDITABLE FIELDS:', ''],
            ['Academic Year:', scheduleData.header.academicYear],
            ['Semester:', scheduleData.header.semester],
            ['Section:', scheduleData.header.scheduleInfo.split('Section:')[1]?.trim() || 'B'],
            ['', ''],
            ['HOW TO ADD COURSES:', 'Replace [Empty] with course information in this format:'],
            ['', 'Course Name', '', 'Example:'],
            ['', 'Course Type', '', 'Software Engineering'],
            ['', 'Room Number', '', 'Lecture'],
            ['', 'Professor Name', '', 'Room 101'],
            ['', '', '', 'Dr. Smith'],
            ['', ''],
            ['Time', ...scheduleData.days]
        ];

        // Add schedule data
        scheduleData.timeSlots.forEach((timeSlot, slotIndex) => {
            const row = [timeSlot];
            for (let dayIndex = 0; dayIndex < scheduleData.days.length; dayIndex++) {
                row.push(getCellContentForExcel(dayIndex, slotIndex));
            }
            wsData.push(row);
        });

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet(wsData);

        // Style configuration
        ws['!cols'] = [
            { wch: 15 },
            ...Array(scheduleData.days.length).fill({ wch: 25 })
        ];

        // Row heights
        ws['!rows'] = Array(wsData.length).fill({ hpt: 30 });

        XLSX.utils.book_append_sheet(wb, ws, "Schedule");
        XLSX.writeFile(wb, 'schedule.xlsx');
    };

    const importFromExcel = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

                // Initialize new schedule data
                const newScheduleData = {
                    ...scheduleData,
                    header: {
                        ...scheduleData.header,
                        university: jsonData[0][1] || scheduleData.header.university,
                        department: jsonData[1][1] || scheduleData.header.department,
                        academicYear: jsonData[4][1] || scheduleData.header.academicYear,
                        semester: jsonData[5][1] || scheduleData.header.semester,
                        scheduleInfo: scheduleData.header.scheduleInfo.replace(
                            /Section: [A-Z]/,
                            `Section: ${jsonData[6][1] || 'B'}`
                        ),
                    },
                    courses: {
                        sat: Array(6).fill(null),
                        sun: Array(6).fill(null),
                        mon: Array(6).fill(null),
                        tue: Array(6).fill(null),
                        wed: Array(6).fill(null),
                        thu: Array(6).fill(null)
                    }
                };

                // Start reading from row 16 (after headers and instructions)
                for (let i = 16; i < jsonData.length; i++) {
                    const row = jsonData[i];
                    if (!row || !row[0]) continue;

                    const timeSlotIndex = i - 16;
                    
                    // Process each day's data
                    for (let j = 1; j <= scheduleData.days.length; j++) {
                        const cellData = row[j];
                        if (cellData && cellData !== '[Empty]') {
                            const [name, type, room, professor] = cellData.split('\n');
                            if (name && type && room && professor) {
                                const day = scheduleData.days[j-1].toLowerCase();
                                newScheduleData.courses[day][timeSlotIndex] = {
                                    name: name.trim(),
                                    type: type.trim(),
                                    room: room.trim(),
                                    professor: professor.trim()
                                };
                            }
                        }
                    }
                }

                setScheduleData(newScheduleData);
                setImportError('');
            } catch (error) {
                console.error('Error importing file:', error);
                setImportError('Error importing file. Please make sure it\'s a valid Excel schedule file.');
            }
            event.target.value = null;
        };
        reader.readAsArrayBuffer(file);
    };

    const handleImportClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="schedule-container">
            <div className="schedule-header">
                <div className="schedule-header-info">
                    <h3>{scheduleData.header.university}</h3>
                    <h4>{scheduleData.header.department}</h4>
                    <div className="schedule-subheader">
                        <p>{scheduleData.header.scheduleInfo}</p>
                        <p>College year: {scheduleData.header.academicYear} - {scheduleData.header.semester}</p>
                    </div>
                </div>
                <div className="schedule-actions">
                    <button className="import-button" onClick={handleImportClick}>
                        <i className="fas fa-file-import"></i>
                        Import Excel
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={importFromExcel}
                        accept=".xlsx,.xls"
                        style={{ display: 'none' }}
                    />
                    <button className="export-button" onClick={exportToExcel}>
                        <i className="fas fa-file-export"></i>
                        Export Excel
                    </button>
                </div>
            </div>
            {importError && <div className="import-error">{importError}</div>}
            
            <div className="schedule-table">
                <div className="time-slots">
                    <div className="time-slot-header">Time</div>
                    {scheduleData.timeSlots.map((slot, index) => (
                        <div key={index} className="time-slot">
                            <span className="time-text">{slot}</span>
                        </div>
                    ))}
                </div>
                
                <div className="schedule-grid">
                    <div className="days-row">
                        {scheduleData.days.map((day, index) => (
                            <div key={index} className="day-header">
                                <span className="day-text">{day}</span>
                            </div>
                        ))}
                    </div>
                    
                    <div className="schedule-cells">
                        {scheduleData.days.map((_, dayIndex) => (
                            <div key={dayIndex} className="day-column">
                                {scheduleData.timeSlots.map((_, slotIndex) => (
                                    <div key={slotIndex} className="schedule-cell">
                                        {getCellContent(dayIndex, slotIndex)}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherSchedule; 