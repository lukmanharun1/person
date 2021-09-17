module.exports.pagination = data => {
    const total_page = Math.ceil(data.count / data.per_page);
    const total_perpage = data.per_page;
    const current_page = data.page;
    const previous_page = current_page == 1 ? null : current_page - 1;
    const next_page = current_page == total_page ? null : current_page + 1;

    const result = {
        data: data.data,
        pagination: {
            total_records: data.count,
            total_perpage: total_perpage,
            total_page,
            current_page,
            next_page,
            previous_page
        }
    };
    return result;
}