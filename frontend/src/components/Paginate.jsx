// import { Pagination } from "react-bootstrap";
// import { LinkContainer } from "react-router-bootstrap";

// const Paginate = ({ pages, page, isAdmin = false, keyword }) => {
//   return (
//     pages > 1 && (
//       <Pagination>
//         {[...Array(pages).keys()].map((x) => (
//           <LinkContainer
//             key={x + 1}
//             to={
//               !isAdmin
//                 ? keyword
//                   ? `/search/${keyword}/page/${x + 1}`
//                   : `/page/${x + 1}`
//                 : `/admin/productlist/${x + 1}`
//             }
//           >
//             <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
//           </LinkContainer>
//         ))}
//       </Pagination>
//     )
//   );
// };

// export default Paginate;

import React from 'react';
import { Link } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';

const Paginate = ({ pages, page, isAdmin = false, keyword }) => {
  return (
    pages > 1 && (
      <Pagination
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'nowrap',
          alignContent: 'center',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        count={pages}
        page={page}
        variant="outlined"
        shape="rounded"
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${item.page}`
                  : `/page/${item.page}`
                : `/admin/productlist/${item.page}`
            }
            {...item}
          />
        )}
      />
    )
  );
};

export default Paginate;
