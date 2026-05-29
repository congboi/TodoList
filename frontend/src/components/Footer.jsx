import React from 'react'
import { FilterType } from '@/lib/data'

const Footer = ({completedTasksCount = 0, activeTasksCount = 0}) => {
  return (

    <>
      {completedTasksCount + activeTasksCount>0 && (
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          {
            completedTasksCount > 0 &&(
              <>
              💦 Tày rồi Mày vừa làm xong {completedTasksCount} việc
              {activeTasksCount > 0 && 
                `, còn ${activeTasksCount} việc`}
                
        
              </>
            )
          }
          {completedTasksCount === 0 && activeTasksCount > 0 &&(
            <>
              Tắt game đi làm {activeTasksCount} việc ngay
            </>
          )}
        </p>
      </div>
      )}
    </>
  )
}

export default Footer