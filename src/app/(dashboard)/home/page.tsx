import React from 'react'

import styles from './page.module.css'

const HomePage: React.FC = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.greeting}>
          <span role='img' aria-label='sun'>
            ☀️
          </span>
          Good Morning Kasun Chamara,
        </div>
        <div className={styles.userProfile}>
          <span className={styles.notificationIcon} role='img' aria-label='bell'>
            🔔
          </span>
          <div className={styles.userName}>Kasun Chamara</div>
        </div>
      </header>
      <div className={styles.dashboard}>
        <div className={styles.leftColumn}>
          <div className={styles.pendingLeaves}>
            <div className={styles.cardHeader}>
              <span role='img' aria-label='calendar'>
                📅
              </span>
              Pending Leaves
            </div>
            <div className={styles.pendingCount}>2</div>
          </div>
          <div className={styles.specialNotices}>
            <div className={styles.cardHeader}>
              Special Notices
              <a href='#' className={styles.seeAll}>
                See all
              </a>
            </div>
            <div className={styles.noticeList}>
              <div className={styles.notice}>Applications are called for Ministry of Education Secratary</div>
              <div className={styles.notice}> All the employyes must attend Poson Festival – 2024</div>
              <div className={styles.notice}></div>
            </div>
          </div>
        </div>
        <div className={styles.rightColumn}>
          <div className={styles.calendar}>
            <div className={styles.calendarHeader}>
              <div>June 2024</div>
            </div>
            <div className={styles.calendarBody}>
              <div className={styles.days}>
                <div>Mo</div>
                <div>Tu</div>
                <div>We</div>
                <div>Th</div>
                <div>Fr</div>
                <div>Sa</div>
                <div>Su</div>
              </div>
              <div className={styles.dates}>{/* Calendar dates would be dynamically generated here */}</div>
            </div>
          </div>
          <div className={styles.upcomingMeetings}>
            <div className={styles.cardHeader}>
              Upcoming Meetings
              <a href='#' className={styles.seeAll}>
                See all
              </a>
            </div>
            <div className={styles.meetingList}>
              <div className={styles.meeting}>
                <div className={styles.meetingDate}>8</div>
                <div>
                  <div className={styles.meetingDetails}>
                    8th - 10th July 2024 <br /> 8 A.M - 9 A.M
                  </div>
                </div>
              </div>
              <div className={styles.meeting}>
                <div className={styles.meetingDate}>13</div>
                <div>
                  <div className={styles.meetingDetails}>
                    13th May 2024 <br /> 8 A.M - 9 A.M
                  </div>
                </div>
              </div>
              <div className={styles.meeting}>
                <div className={styles.meetingDate}>18</div>
                <div>
                  <div className={styles.meetingDetails}>
                    18th May 2024 <br /> 8 A.M - 9 A.M
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
