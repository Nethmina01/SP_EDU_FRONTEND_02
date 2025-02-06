'use client'

// React Imports
import { useEffect, useState, useMemo } from 'react'

// Next Imports
import { useRouter } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import TablePagination from '@mui/material/TablePagination'
import type { TextFieldProps } from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'

// Third-party Imports
import classnames from 'classnames'
import { rankItem } from '@tanstack/match-sorter-utils'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table'
import type { ColumnDef, FilterFn } from '@tanstack/react-table'
import type { RankingInfo } from '@tanstack/match-sorter-utils'

import { toast } from 'react-toastify'

import axios from '@/utils/axios'

// Component Imports
import TablePaginationComponent from '@components/TablePaginationComponent'
import OptionMenu from '@core/components/option-menu'
import CustomTextField from '@core/components/mui/TextField'
import ModeToggleWarning from '../ModeToggleWarning'

// Style Imports
import tableStyles from '@core/styles/table.module.css'
import type { DepartmentType } from '@/types/department/departmentTypes'

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

type AxiosErrorResponse = {
  response?: {
    data?: {
      data?: string
    }
  }
}

type DepartmentTypeWithAction = DepartmentType & {
  action?: string
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<TextFieldProps, 'onChange'>) => {
  // States
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
}

// Column Definitions
const columnHelper = createColumnHelper<DepartmentTypeWithAction>()

const DepartmentTable = () => {
  // States
  const [rowSelection, setRowSelection] = useState({})
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [globalFilter, setGlobalFilter] = useState('')
  const [activateWarning, setActivateWarning] = useState(false)
  const [deactivateWarning, setDeactivateWarning] = useState(false)
  const [deleteWarning, setDeleteWarning] = useState(false)
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<string | null>(null)
  const [departmentData, setDepartmentData] = useState<DepartmentType[]>([])
  const [loading, setLoading] = useState(true)

  // Router
  const router = useRouter()

  const fetchDepartmentData = async () => {
    setLoading(true)

    try {
      const response = await axios.get('/department')

      setDepartmentData(response.data.data)
      setLoading(false)
    } catch (error) {
      console.error('Failed to fetch department data', error)
    }
  }

  useEffect(() => {
    fetchDepartmentData()
  }, [])

  const handleOpenDeleteConfirm = (departmentId: string) => {
    setSelectedDepartmentId(departmentId)
    setDeleteWarning(true)
  }

  const handleCloseDeleteConfirm = () => {
    setDeleteWarning(false)
    setSelectedDepartmentId(null)
  }

  const confirmDeleteDepartment = async () => {
    if (selectedDepartmentId) {
      try {
        const response = await axios.delete(`/department/${selectedDepartmentId}`)

        if (response.status === 200) {
          fetchDepartmentData()
          toast.success('Department deleted successfully')
        } else {
          throw new Error('Failed to delete department')
        }
      } catch (error) {
        const err = error as AxiosErrorResponse

        if (err.response && err.response.data && err.response.data.data) {
          const errorData = err.response.data.data

          if (Array.isArray(errorData)) {
            errorData.forEach(message => toast.error(message))
          } else {
            toast.error(errorData)
          }
        } else {
          toast.error('Failed to delete department')
        }
      }
    }
  }

  const columns = useMemo<ColumnDef<DepartmentTypeWithAction, any>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler()
            }}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler()
            }}
          />
        )
      },
      columnHelper.accessor('departmentId', {
        header: 'Department Id',
        cell: ({ row }) => (
          <div className='flex items-center gap-4'>
            <div className='flex flex-col'>
              <Typography className='capitalize' color='text.primary'>
                {/* {format(parseISO(row.original.created_at), 'yyyy-MM-dd')} */}
                {row.original.departmentId}
              </Typography>
            </div>
          </div>
        )
      }),
      columnHelper.accessor('departmentName', {
        header: 'Department Name',
        cell: ({ row }) => (
          <div className='flex items-center gap-4'>
            <div className='flex flex-col'>
              <Typography className='capitalize' color='text.primary'>
                {/* {format(parseISO(row.original.created_at), 'yyyy-MM-dd')} */}
                {row.original.departmentName}
              </Typography>
            </div>
          </div>
        )
      }),
      columnHelper.accessor('description', {
        header: 'Description',
        cell: ({ row }) => (
          <div className='flex items-center gap-4'>
            <div className='flex flex-col'>
              <Typography className='capitalize' color='text.primary'>
                {/* {format(parseISO(row.original.created_at), 'yyyy-MM-dd')} */}
                {row.original.description}
              </Typography>
            </div>
          </div>
        )
      }),
      columnHelper.accessor('action', {
        header: () => <div className='flex justify-center'>ACTION</div>,
        cell: ({ row }) => (
          <div className='flex items-center justify-center'>
            <OptionMenu
              iconClassName='text-[22px] text-textSecondary'
              options={[
                {
                  text: 'View',
                  icon: 'tabler-eye text-[22px] text-textSecondary',
                  menuItemProps: {
                    className: 'flex items-center gap-2 text-textSecondary',
                    onClick: () => router.push(`/department/${row.original.departmentId}`)
                  }
                },
                {
                  text: row.original.status === 'active' ? 'Deactivate' : 'Activate',
                  icon: row.original.status === 'active' ? 'close-icon text-[22px]' : 'tabler-check text-[22px]',
                  menuItemProps: {
                    className: 'flex items-center gap-2 text-textSecondary',
                    onClick: () => {
                      row.original.status === 'active' ? setDeactivateWarning(true) : setActivateWarning(true)
                    }
                  }
                },
                {
                  text: 'Delete',
                  icon: 'tabler-trash text-[22px] text-textSecondary',
                  menuItemProps: {
                    className: 'flex items-center gap-2 text-textSecondary',
                    onClick: () => handleOpenDeleteConfirm(row.original.departmentId)
                  }
                }
              ]}
            />
          </div>
        ),
        enableSorting: false
      })
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const table = useReactTable({
    data: departmentData,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      rowSelection,
      globalFilter
    },
    initialState: {
      pagination: {
        pageSize: 10
      },
      sorting: [
        {
          id: 'date',
          desc: true
        }
      ]
    },
    enableRowSelection: true, //enable row selection for all rows
    // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
    globalFilterFn: fuzzyFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues()
  })

  return (
    <>
      <Card>
        <div className='flex justify-between flex-col items-start md:flex-row md:items-center p-6 border-bs gap-4'>
          <CustomTextField
            select
            value={table.getState().pagination.pageSize}
            onChange={e => table.setPageSize(Number(e.target.value))}
            className='is-[70px]'
          >
            <MenuItem value='10'>10</MenuItem>
            <MenuItem value='25'>25</MenuItem>
            <MenuItem value='50'>50</MenuItem>
          </CustomTextField>
          <div className='flex flex-col sm:flex-row is-full sm:is-auto items-start sm:items-center gap-4'>
            <DebouncedInput
              value={globalFilter ?? ''}
              onChange={value => setGlobalFilter(String(value))}
              placeholder='Search Department'
              className='is-full sm:is-auto'
            />
            <Button
              color='secondary'
              variant='tonal'
              startIcon={<i className='tabler-upload' />}
              className='is-full sm:is-auto'
            >
              Export
            </Button>
            <Button
              color='primary'
              variant='contained'
              startIcon={<i className='tabler-plus' />}
              className='is-full sm:is-auto'
              onClick={() => router.push('/department/new')}
            >
              Add New Department
            </Button>
          </div>
        </div>
        <div className='overflow-x-auto'>
          <table className={tableStyles.table}>
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id}>
                      {header.isPlaceholder ? null : (
                        <>
                          <div
                            className={classnames({
                              'flex items-center': header.column.getIsSorted(),
                              'cursor-pointer select-none': header.column.getCanSort()
                            })}
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {{
                              asc: <i className='tabler-chevron-up text-xl' />,
                              desc: <i className='tabler-chevron-down text-xl' />
                            }[header.column.getIsSorted() as 'asc' | 'desc'] ?? null}
                          </div>
                        </>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            {loading && (
              <tbody>
                <tr>
                  <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                    Loading...
                  </td>
                </tr>
              </tbody>
            )}
            {table.getFilteredRowModel().rows.length === 0 && !loading ? (
              <tbody>
                <tr>
                  <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                    No data available
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {table
                  .getRowModel()
                  .rows.slice(0, table.getState().pagination.pageSize)
                  .map(row => {
                    return (
                      <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
                        {row.getVisibleCells().map(cell => (
                          <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                        ))}
                      </tr>
                    )
                  })}
              </tbody>
            )}
          </table>
        </div>
        <TablePagination
          component={() => <TablePaginationComponent table={table} />}
          count={table.getFilteredRowModel().rows.length}
          rowsPerPage={table.getState().pagination.pageSize}
          page={table.getState().pagination.pageIndex}
          onPageChange={(_, page) => {
            table.setPageIndex(page)
          }}
        />
      </Card>

      <ModeToggleWarning
        open={activateWarning}
        onClose={() => setActivateWarning(false)}
        mode='activate'
        onConfirm={confirmDeleteDepartment}
        name='Department'
      />
      <ModeToggleWarning
        open={deactivateWarning}
        onClose={() => setDeactivateWarning(false)}
        mode='deactivate'
        onConfirm={confirmDeleteDepartment}
        name='Department'
      />
      <ModeToggleWarning
        open={deleteWarning}
        onClose={handleCloseDeleteConfirm}
        mode='delete'
        onConfirm={confirmDeleteDepartment}
        name='Department'
      />
    </>
  )
}

export default DepartmentTable
