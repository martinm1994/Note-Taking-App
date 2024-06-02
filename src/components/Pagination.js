import React from 'react';
import { Pagination as NotePagination} from 'antd';

const Pagination = ({ currentPage, notesPerPage, totalNotes, paginate }) => {
    // eslint-disable-next-line no-unused-vars
    const totalPages = Math.ceil(totalNotes / notesPerPage);
    
    const onChange = (page, pageSize) => {
        paginate(page);
    };

    return (
        <NotePagination
            current={currentPage}
            pageSize={notesPerPage}
            total={totalNotes}
            onChange={onChange}
            showSizeChanger={false}
        />
    );
};

export default Pagination;