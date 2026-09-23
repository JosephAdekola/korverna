import PaginationV1 from '@/src/global_ui_vault/paginator/version_one'
import DataTable from '@/src/global_ui_vault/table'
import React from 'react'
import { sentHistoryCols } from './data/sentHistoryCols'
import { sentHistoryRows } from './data/sentHistoryRows'

export default function EmailSentHistory() {
  return (

    <div
      className='flex flex-col gap-5 w-full overflow-x-hidden!'>
      <div
        className='w-full overflow-x-scroll! '>

        <DataTable
              columns={sentHistoryCols}
              data={sentHistoryRows}
              searchable={false}
              rowKey={"id"}
              containerClassname=''
              tableHeadClassname='bg-primary/30'
              thClassname='py-2 px-4 text-left text-xs uppercase text-foreground-secondary whitespace-nowrap min-w-[150px]'
              trClassname='hover:bg-primary/30 transition-colors'
              tdClassname='px-4 py-4 text-xs align-top'
            />

      </div>
      <div
        className='flex justify-end overflow-x-hidden'>
        <PaginationV1
          currentPage={5}
          onPageChange={() => { }}
          totalPages={20}
          siblingCount={1}
          size='sm' />
      </div>
    </div>
  )
}
