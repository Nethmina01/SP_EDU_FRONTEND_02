'use client';

import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from './Meetings.module.css';

export default function MeetingsPage() {
  const [date, setDate] = useState(new Date());

  return (
    <div className={styles.container}>
      <div className={styles.meetingForm}>
        <h1>Schedule a Meeting</h1>
        <form>
          <div className={styles.formGroup}>
            <label htmlFor="title">Meeting Title</label>
            <input type="text" id="title" name="title" required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="date">Date</label>
            <input type="date" id="date" name="date" required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="time">Time</label>
            <input type="time" id="time" name="time" required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="participants">Participants</label>
            <input type="text" id="participants" name="participants" required />
          </div>
          <button type="submit" className={styles.submitButton}>Schedule</button>
        </form>
      </div>
      <div className={styles.calendar}>
        <Calendar onChange={setDate} value={date} />
      </div>
    </div>
  );
}
