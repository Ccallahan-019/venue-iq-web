import { forwardRef } from 'react'

import { Link as RadixLink, type LinkProps as RadixLinkProps } from '@radix-ui/themes'

import NextLink, { type LinkProps as NextLinkProps } from 'next/link'

type RadixProps = Omit<RadixLinkProps, 'asChild' | 'href'>

export type LinkProps = RadixProps &
  Pick<NextLinkProps, 'href' | 'prefetch' | 'replace' | 'scroll'> & {
    isExternal?: boolean
    newTab?: boolean
  }

const isProbablyExternalHref = (href: LinkProps['href']) => {
  if (typeof href !== 'string') return false
  return /^(https?:)?\/\//.test(href) || href.startsWith('mailto:') || href.startsWith('tel:')
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { href, isExternal, newTab, prefetch, replace, scroll, rel, target, ...props },
  ref,
) {
  const external = isExternal ?? isProbablyExternalHref(href)

  if (external) {
    const nextTarget = newTab ? '_blank' : target
    const nextRel = newTab || nextTarget === '_blank' ? (rel ?? 'noreferrer noopener') : rel

    return (
      <RadixLink
        ref={ref}
        href={typeof href === 'string' ? href : ''}
        target={nextTarget}
        rel={nextRel}
        {...props}
      />
    )
  }

  return (
    <RadixLink ref={ref} asChild {...props}>
      <NextLink href={href} prefetch={prefetch} replace={replace} scroll={scroll}>
        {props.children}
      </NextLink>
    </RadixLink>
  )
})
