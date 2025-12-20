Admin Dashbopard.
import Pagination from "../../components/Pagination/Pagination";

const [pagination, setPagination] = useState(null);
setPagination(response?.data?.pagination || null);

            <Pagination
              pagination={pagination}
              page={page}
              hasPrevPage={hasPrevPage}
              hasNextPage={hasNextPage}
              onPageChange={(p) => updateParams({ page: p })}
            />