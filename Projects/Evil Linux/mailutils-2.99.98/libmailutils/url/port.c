/* GNU Mailutils -- a suite of utilities for electronic mail
   Copyright (C) 2010-2012 Free Software Foundation, Inc.

   This library is free software; you can redistribute it and/or
   modify it under the terms of the GNU Lesser General Public
   License as published by the Free Software Foundation; either
   version 3 of the License, or (at your option) any later version.

   This library is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
   Lesser General Public License for more details.

   You should have received a copy of the GNU Lesser General
   Public License along with this library.  If not, see 
   <http://www.gnu.org/licenses/>. */

#ifdef HAVE_CONFIG_H
# include <config.h>
#endif

#include <errno.h>
#include <stdlib.h>
#include <string.h>
#ifdef HAVE_STRINGS_H
# include <strings.h>
#endif

#include <mailutils/types.h>
#include <mailutils/cstr.h>
#include <mailutils/sys/url.h>

int
mu_url_get_port (const mu_url_t url, unsigned *pport)
{
  if (url == NULL)
    return EINVAL;
  if (url->_get_port)
    return url->_get_port (url, pport);
  *pport = url->port;
  return 0;
}

int
mu_url_is_same_port (mu_url_t url1, mu_url_t url2)
{
  unsigned p1 = 0, p2 = 0;

  mu_url_get_port (url1, &p1);
  mu_url_get_port (url2, &p2);
  return (p1 == p2);
}

