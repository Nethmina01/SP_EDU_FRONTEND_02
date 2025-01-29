'use client'

// React Imports
import { useEffect, useState, useMemo } from 'react'

// Next.js Imports
import { useRouter } from 'next/navigation'

import { toast } from 'react-toastify'

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

import axios from '@/utils/axios'

// Component Imports
import TablePaginationComponent from '@components/TablePaginationComponent'
import OptionMenu from '@core/components/option-menu'
import CustomTextField from '@core/components/mui/TextField'
import ModeToggleWarning from '../ModeToggleWarning'

// Style Imports
import tableStyles from '@core/styles/table.module.css'
import type { UserType } from '@/types/user/userTypes'

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

type UserTypeWithAction = UserType & {
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
const columnHelper = createColumnHelper<UserTypeWithAction>()

const DepartmentTable = () => {
  // States
  const [userData, setUserData] = useState<UserType[]>([])
  const [loading, setLoading] = useState(true)
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')
  const [activateWarning, setActivateWarning] = useState(false)
  const [deactivateWarning, setDeactivateWarning] = useState(false)
  const [deleteWarning, setDeleteWarning] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)

  // Router
  const router = useRouter()

  const fetchUserData = async () => {
    setLoading(true)

    try {
      const response = await axios.get('/user')

      setUserData(response.data.data)
      setLoading(false)
    } catch (error) {
      console.error('Failed to fetch user data', error)
    }
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  const handleOpenDeleteConfirm = (userId: string) => {
    setSelectedUserId(userId)
    setDeleteWarning(true)
  }

  const handleCloseDeleteConfirm = () => {
    setDeleteWarning(false)
    setSelectedUserId(null)
  }

  const confirmDeleteUser = async () => {
    if (selectedUserId) {
      try {
        const response = await axios.delete(`/user/${selectedUserId}`)

        if (response.status === 200) {
          fetchUserData()
          toast.success('User deleted successfully')
        } else {
          throw new Error('Failed to delete user')
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
          toast.error('Failed to delete user')
        }
      }
    }
  }

  const columns = useMemo<ColumnDef<UserTypeWithAction, any>[]>(
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
      columnHelper.accessor('userId', {
        header: 'User ID',
        cell: ({ row }) => (
          <div className='flex items-center gap-4'>
            <Typography color='text.primary'>{row.original.userId}</Typography>
          </div>
        )
      }),
      columnHelper.accessor('firstName', {
        header: 'Name',
        cell: ({ row }) => (
          <div className='flex items-center gap-4'>
            <Typography color='text.primary'>{row.original.firstName + ' ' + row.original.lastName}</Typography>
          </div>
        )
      }),
      columnHelper.accessor('email', {
        header: 'Email',
        cell: ({ row }) => (
          <div className='flex items-center gap-4'>
            <Typography color='text.primary'>{row.original.email}</Typography>
          </div>
        )
      }),
      columnHelper.accessor('userRole', {
        header: 'User Role',
        cell: ({ row }) => (
          <div className='flex items-center gap-4'>
            <Typography color='text.primary'>{row.original.userRole}</Typography>
          </div>
        )
      }),
      columnHelper.accessor('mobileNumber', {
        header: 'Mobile Number',
        cell: ({ row }) => (
          <div className='flex items-center gap-4'>
            <Typography color='text.primary'>{row.original.mobileNumber}</Typography>
          </div>
        )
      }),
      columnHelper.accessor('departmentId', {
        header: 'Department',
        cell: ({ row }) => (
          <div className='flex items-center gap-4'>
            <Typography color='text.primary'>{row.original.departmentId}</Typography>
          </div>
        )
      }),
      columnHelper.accessor('divisionId', {
        header: 'Division',
        cell: ({ row }) => (
          <div className='flex items-center gap-4'>
            <Typography color='text.primary'>{row.original.divisionId}</Typography>
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
                    onClick: () => router.push(`/user/${row.original.userId}`)
                  }
                },
                {
                  text: row.original.status === 'Active' ? 'Deactivate' : 'Activate',
                  icon: row.original.status === 'Active' ? 'tabler-x text-[22px]' : 'tabler-check text-[22px]',
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
                    onClick: () => handleOpenDeleteConfirm(row.original.userId)
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
    data: userData,
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
              placeholder='Search User'
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
              onClick={() => router.push('/user-management/new')}
            >
              Add New User
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
        onConfirm={confirmDeleteUser}
        name='User'
      />
      <ModeToggleWarning
        open={deactivateWarning}
        onClose={() => setDeactivateWarning(false)}
        mode='deactivate'
        onConfirm={confirmDeleteUser}
        name='User'
      />
      <ModeToggleWarning
        open={deleteWarning}
        onClose={handleCloseDeleteConfirm}
        mode='delete'
        onConfirm={confirmDeleteUser}
        name='User'
      />
    </>
  )
}

export default DepartmentTable
