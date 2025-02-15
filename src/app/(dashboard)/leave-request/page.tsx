//import React from 'react';
import styles from './page.module.css'

const LeaveRequestPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1>Summary of leave for Kasun Chamara</h1>
      <div className={styles.summaryContainer}>
        <div className={styles.summaryItem}>
          <div className={styles.summaryValue}>7</div>
          <div>Days available</div>
        </div>
        <div className={styles.summaryItem}>
          <div className={styles.summaryValue}>4</div>
          <div>Pending requests</div>
        </div>
        <div className={styles.summaryItem}>
          <div className={styles.summaryValue}>0</div>
          <div>Days upcoming</div>
        </div>
        <div className={styles.summaryItem}>
          <div className={styles.summaryValue}>25</div>
          <div>Days per year</div>
        </div>
      </div>

      <h2>Time off history</h2>
      <div className={styles.historyChart}>Chart here</div>

      <h2>Requested time off</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Leave Type</th>
            <th>Date from</th>
            <th>Date to</th>
            <th>Duration</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Sick</td>
            <td>18/01/2020</td>
            <td>18/01/2020</td>
            <td>11 hours</td>
            <td>Decline</td>
          </tr>
          <tr>
            <td>Time off</td>
            <td>15/03/2020</td>
            <td>15/03/2020</td>
            <td>48 hours</td>
            <td>Accepted</td>
          </tr>
          <tr>
            <td>Holiday</td>
            <td>28/04/2020</td>
            <td>28/04/2020</td>
            <td>12 hours</td>
            <td>Requested</td>
          </tr>
          <tr>
            <td>Family Time</td>
            <td>12/05/2020</td>
            <td>12/05/2020</td>
            <td>32 hours</td>
            <td>Accepted</td>
          </tr>
        </tbody>
      </table>

      <h2>Time off requests</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Leave Type</th>
            <th>Date from</th>
            <th>Date to</th>
            <th>Duration</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Holiday</td>
            <td>12/02/2020</td>
            <td>12/02/2020</td>
            <td>13 hours</td>
            <td>Accepted</td>
          </tr>
          <tr>
            <td>Sick</td>
            <td>18/04/2020</td>
            <td>18/04/2020</td>
            <td>24 hours</td>
            <td>Accepted</td>
          </tr>
          <tr>
            <td>Family Time</td>
            <td>22/05/2020</td>
            <td>22/05/2020</td>
            <td>17 hours</td>
            <td>Accepted</td>
          </tr>
          <tr>
            <td>Time off</td>
            <td>26/06/2020</td>
            <td>26/06/2020</td>
            <td>22 hours</td>
            <td>Accepted</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default LeaveRequestPage
