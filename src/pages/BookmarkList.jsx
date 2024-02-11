import { FaTrashAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

function BookmarkList({ bookmarks }) {
  const navigate = useNavigate() // useNavigate 훅 사용

  // 수정 페이지로 이동하는 함수
  const handleEdit = (bookmarkId) => {
    navigate(`/modifyBookmark/${bookmarkId}`) // `modifyBookmark` 페이지로 이동하도록 경로 설정
  }

  return (
    <div className="my-bookmark-container">
      {bookmarks.map((bookmark, index) => (
        <div key={index} className="bookmark-card bg-greens">
          <FaTrashAlt
            className="cursor-pointer absolute top-2 right-2 text-red-50"
            size={24}
          />
          <p className="pt-4 item-center text-2xl font-bold">
            {bookmark.title}
          </p>
          <p className="pt-2 text-xl text-gray-500 text-bold">
            {bookmark.createdAt}
          </p>
          <p className="pt-2 text-xl text-gray-500 text-bold">
            {Array.isArray(bookmark.hashTagContent)
              ? bookmark.hashTagContent.join(' ')
              : ''}
          </p>
          <hr className="border-b-1 border-black" />
          <button
            onClick={() => handleEdit(bookmark.id)} // 수정 버튼 클릭 이벤트 핸들러
            className="text-xl font-bold text-center mt-2"
          >
            수정하기
          </button>
        </div>
      ))}
    </div>
  )
}

export default BookmarkList
