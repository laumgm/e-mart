import React, { useEffect } from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({ pages, page, isAdmin=false, isSeller=false, keyword = '', category = '' }) => {
    useEffect(() => {
        console.log('paginate isAdmin', isAdmin)
        console.log('paginate isSeller', isSeller)
    })
    return pages > 1 && (
        <Pagination>
            {[...Array(pages).keys()].map(x => (
                <LinkContainer 
                  key={x + 1} 
                  to={isAdmin ?`/admin/productlist/${x+1}` 
                    : isSeller ? `/productlist/seller/${x+1}`
                    : keyword ? `/search/${keyword}/page/${x+1}` 
                    : category ? `/category/${category}/page/${x+1}`
                    : `/page/${x+1}`
                  }
                >
                    <Pagination.Item active={x+1 === page}>
                        {x+1}
                    </Pagination.Item>
                </LinkContainer>
            ))}
        </Pagination>
    )
}

export default Paginate 