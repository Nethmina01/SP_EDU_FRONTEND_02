import React from 'react'

import classNames from 'classnames'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const CustomPhoneInput = (props: any) => {
  return (
    <PhoneInput
      country={'lk'}
      {...props}
      containerClass='w-full bg-transparent'
      inputClass={classNames(
        'w-full h-9 focus:outline-none focus:ring-0 border-[var(--mui-palette-customColors-inputBorder)] focus:border-2 focus:shadow-md text-[16px] pl-10 bg-transparent text-[var(--mui-palette-text-primary)]',
        props.error ? 'border-red-500 focus:border-red-500 ' : 'focus:border-primary '
      )}
      buttonClass='bg-transparent border-none [&>div]:w-0 [&>div]:h-0 [&>div]:mt-[18px] [&>ul]:bg-[var(--mui-palette-background-paper)] [&>ul>li>span]:text-[var(--mui-palette-text-primary)]'
      dropdownClass='shadow-md'
      countryCodeEditable={false}
      masks={{ lk: '.. ... ....' }}
    />
  )
}

export default CustomPhoneInput
