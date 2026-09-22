import PaginationV1 from '@/src/global_ui_vault/paginator/version_one'
import DataTable from '@/src/global_ui_vault/table'
import React from 'react'
import { sentHistoryCols } from './data/sentHistoryCols'

export default function EmailSentHistory() {
  return (

    <div
      className='flex flex-col gap-5 w-full overflow-x-hidden!'>
      <div
        className='overflow-x-scroll! '>

        <DataTable
          columns={sentHistoryCols}
          data={[]}
          rowKey={"id"}
          searchable={false} />

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
