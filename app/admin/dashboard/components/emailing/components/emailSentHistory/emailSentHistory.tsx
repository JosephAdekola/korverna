import PaginationV1 from '@/src/global_ui_vault/paginator/version_one'
import DataTable from '@/src/global_ui_vault/table'
import React, { useCallback, useEffect, useState } from 'react'
import { sentHistoryCols } from './data/sentHistoryCols'
import { fetchSentHistoryRows, SentHistoryRowsProps } from './data/sentHistoryRows'
import { ServerPaginationProps } from '@/src/global_ui_vault/paginator/version_one/data/PaginationProps'
import DataTableSkeleton from '@/src/global_ui_vault/table/dataTableSkeleton'

export default function EmailSentHistory() {

  const [historyData, setHistoryData] = useState<SentHistoryRowsProps[] | null>(null)
  const [historyPagination, setHistoryPagination] = useState<ServerPaginationProps | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(10)
  const [emailLogErrorMessage, setEmailLogErrorMessage] = useState<string>("")

  useEffect(() => {
    fetchSentHistoryRows({
      page: currentPage,
      limit,
      setEmailLogErrorMessage,
      setHistoryData,
      setHistoryPagination
    })
  }, [limit, currentPage])

  return (

    <div
      className='flex flex-col gap-5 w-full overflow-x-hidden!'>
      <div
        className='w-full overflow-x-scroll! '>

        {
          !historyData ?
            <div>
              {
                emailLogErrorMessage ?
                  <div
                    className='flex justify-center items-center'>
                    <p>
                      {emailLogErrorMessage}
                    </p>
                  </div> :
                  <DataTableSkeleton />
              }
            </div> :
            <DataTable
              columns={sentHistoryCols}
              data={historyData}
              searchable={false}
              rowKey={"id"}
              containerClassname=''
              tableHeadClassname='bg-primary/30'
              thClassname='py-2 px-4 text-left text-xs uppercase text-foreground-secondary whitespace-nowrap min-w-[150px]'
              trClassname='bg-primary/10 text-5xl hover:bg-primary/30 border-b border-primary! transition-colors'
              tdClassname='px-4 py-4 text-xs align-top border-r'
              emptyMessage='There are no sent history'
            />
        }

      </div>
      <div
        className='flex justify-end overflow-x-hidden'>
        {
          historyPagination && (
            <PaginationV1
              currentPage={historyPagination?.currentPage}
              onPageChange={setCurrentPage}
              totalPages={historyPagination.totalPages}
              siblingCount={1}
              size='sm' />
          )
        }
      </div>
    </div>
  )
}
