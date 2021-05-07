import { FC } from 'react'
import Link from 'next/link'
import cn from 'classnames'
import type { LineItem } from '@framework/types'
import useCart from '@framework/cart/use-cart'
import useCustomer from '@framework/customer/use-customer'
import { Avatar } from '@components/common'
import { Heart, Bag, Lightmode } from '@components/icons'
import { useUI } from '@components/ui/context'
import DropdownMenu from './DropdownMenu'
import s from './UserNav.module.css'
import { useTheme } from 'next-themes'

interface Props {
  className?: string
}

const countItem = (count: number, item: LineItem) => count + item.quantity

const UserNav: FC<Props> = ({ className }) => {
  const { data } = useCart()
  const { data: customer } = useCustomer()
  const { toggleSidebar, closeSidebarIfPresent, openModal } = useUI()
  const itemsCount = data?.lineItems.reduce(countItem, 0) ?? 0
  const { theme, setTheme } = useTheme()

  return (
    <nav className={cn(s.root, className)}>
      <div className={s.mainContainer}>
        <ul className={s.list}>
          <li className={s.item}>
            {theme === 'dark' ? (
              <button onClick={() => setTheme('light')}>🎇</button>
            ) : (
              <button onClick={() => setTheme('dark')}>🌚</button>
            )}
          </li>
          <li className={s.item}>
            <>
             <Bag />
            </>
            {itemsCount > 0 && <span className={s.bagCount}>{itemsCount}</span>}
          </li>
          {process.env.COMMERCE_WISHLIST_ENABLED && (
            <li className={s.item}>
              <Link href="/wishlist">
                <a onClick={closeSidebarIfPresent} aria-label="Wishlist">
                  <Heart />
                </a>
              </Link>
            </li>
          )}
          <li className={s.item}>
            {customer ? (
              <></>
            ) : (
              // <DropdownMenu />
              <button
                className={s.avatarButton}
                aria-label="Menu"
              >
                <Avatar />
              </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default UserNav
