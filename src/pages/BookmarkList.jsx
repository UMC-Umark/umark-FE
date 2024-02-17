import { FaTrashAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

function BookmarkList({ bookmarks, onEdit }) {
  const safeBookmarks = Array.isArray(bookmarks) ? bookmarks : []

  return (
    <div className="flex flex-wrap justify-start">
      {safeBookmarks.map((bookmark, index) => {
        const date = new Date(bookmark.createdAt)
        const formattedTime = `${date.getFullYear()}/${(date.getMonth() + 1)
          .toString()
          .padStart(2, '0')}/${date
          .getDate()
          .toString()
          .padStart(2, '0')} ${date
          .getHours()
          .toString()
          .padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
        return (
          <div
            key={index}
            className="p-4 h-72 border-2 border-black bg-gray-100 shadow-md m-2 mb-4 relative"
            style={{ width: 'calc(25% - 1rem)' }} // 여기서 너비를 계산식으로 조정
          >
            <FaTrashAlt
              className="cursor-pointer absolute top-2 right-2 text-gray fill-gray-400"
              size={24}
            />
            <div className="flex flex-col mb-1 h-4/5 ml-4">
              <p className="pt-4 item-center text-3xl font-bold mb-2 mt-2">
                {bookmark.title}
              </p>
              <p className="pt-2 text-xl text-gray-400 text-bold mt-1 mb-4">
                {formattedTime}
              </p>
              <div className="flex flex-wrap gap-2 pt-2 mt-2 mb-2">
                {Array.isArray(bookmark.hashTagContent)
                  ? bookmark.hashTagContent.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-300 rounded-lg px-2 py-1 text-xl text-gray-500"
                      >
                        {tag}
                      </span>
                    ))
                  : ''}
              </div>
            </div>
            <hr className="border-b-2 border-black my-2" />
            <div className="flex items-center justify-center">
              <button
                onClick={() => onEdit(bookmark.id)}
                className="w-full text-2xl font-bold text-center px-8 py-1 mb-1"
              >
                수정하기
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
//token eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJVbWFyayIsImlhdCI6M…Fn1LR74rqe0B4OXu4wBad8L0o6frwzY0TmzKF4V2Dh3rtXI9Q
export default BookmarkList
