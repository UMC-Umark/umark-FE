import { FaTrashAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

function BookmarkList({ bookmarks, onEdit }) {
  const safeBookmarks = Array.isArray(bookmarks) ? bookmarks : []

  return (
    <div className="flex flex-wrap justify-center">
      {safeBookmarks.map((bookmark, index) => (
        <div
          key={index}
          className="flex-auto min-w-0 p-4 h-60 border border-black bg-red-50 shadow-md m-2"
          style={{ flexBasis: 'calc(25% - 2rem)' }}
        >
          <FaTrashAlt
            className="cursor-pointer absolute top-2 right-2 text-black"
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
            onClick={() => onEdit(bookmark.id)}
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
