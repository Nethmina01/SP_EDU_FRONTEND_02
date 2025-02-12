import React from 'react'

import styles from './page.module.css'

const AttendancePage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>13 June, 2024</div>
        <div> Kasun Chamara </div>
      </div>
      <div className={styles.dashboard}>
        <div className={styles.card}>
          <h2>Mark Attendance</h2>
          <div className={styles.attendanceDate}>13 June, 2024</div>
          <div>Thurs day</div>
          <div className={styles.timeInput}>
            <label>Time In</label>
            <input type='text' value='12:08 PM' readOnly />
          </div>
          <div className={styles.timeInput}>
            <label>Time Out</label>
            <input type='text' value='07:08 PM' readOnly />
          </div>
          <button className={styles.markButton}>Mark Attendance</button>
          <div className={styles.notifyLink}>Notify for work from home</div>
        </div>
        <div className={styles.card}>
          <h2>Progress Report</h2>
          <div className={styles.reportToggle}>
            <span>Weekly</span>
            <span>Monthly</span>
          </div>
          <div className={styles.chart}>Chart here</div>
        </div>
        <div className={styles.card}>
          <h2>Leaves Detail</h2>
          <div className={styles.calendar}>Calendar here</div>
          <button className={styles.applyLeaveButton}>Apply for Leave</button>
          <div>Leaves Count - 2020</div>
          <div className={styles.leaveCount}>
            <span className={styles.leaveTaken}>3 Leaves</span>
            <span className={styles.leaveTotal}>12 Leaves</span>
          </div>
        </div>
      </div>
      <div className={styles.attendanceList}>
        <h2>Attendance</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Day</th>
              <th>Time In</th>
              <th>Time Out</th>
              <th>Hours Spent</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>01 July</td>
              <td>Monday</td>
              <td>09:10 am</td>
              <td>06:10 pm</td>
              <td>07</td>
            </tr>
            <tr>
              <td>02 July</td>
              <td>Tuesday</td>
              <td>08:58 am</td>
              <td>08:58 pm</td>
              <td>09</td>
            </tr>
            <tr>
              <td>03 July</td>
              <td>Wednesday</td>
              <td>10:10 am</td>
              <td>10:10 pm</td>
              <td>08</td>
            </tr>
            <tr>
              <td>04 July</td>
              <td>Thursday</td>
              <td>Leave</td>
              <td>Leave</td>
              <td></td>
            </tr>
            <tr>
              <td>05 July</td>
              <td>Friday</td>
              <td>09:10 am</td>
              <td>05:18 pm</td>
              <td>09</td>
            </tr>
            <tr>
              <td>08 July</td>
              <td>Monday</td>
              <td>09:12 am</td>
              <td>08:58 pm</td>
              <td>09</td>
            </tr>
            <tr>
              <td>09 July</td>
              <td>Tuesday</td>
              <td>WFH</td>
              <td>10:02 pm</td>
              <td>07</td>
            </tr>
            <tr>
              <td>10 July</td>
              <td>Wednesday</td>
              <td>10:10 am</td>
              <td>10:10 pm</td>
              <td>09</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AttendancePage
