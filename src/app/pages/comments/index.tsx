import { Flex, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useUseGetCommentsQuery } from '../../services/comment';
import { Link } from 'react-router-dom';

function CommentsPage() {
  const { data, isLoading, isSuccess, isError, error } = useUseGetCommentsQuery();

  if (isLoading) {
    return (
      <Flex align="center" justify="center" gap="middle">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </Flex>
    );
  }

  if (isError) {
    // error example { status: 'FETCH_ERROR'; error: 'TypeError: Failed to fetch' }
    return <div>{JSON.stringify(error)}</div>;
  }

  if (isSuccess) {
    return (
      <div className="flex gap-2 flex-wrap">
        {data.comments.map((comment) => (
          <Link key={comment.id} to={`/comments/${comment.id}`}>
            {comment.body}
          </Link>
        ))}
      </div>
    );
  }
}

export { CommentsPage };
