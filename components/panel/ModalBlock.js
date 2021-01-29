import NameForm from './NameForm'

const ModalBlock = ({ modal, togleModal, user, mutate }) => {
  return (
    <div>
      <div
        className="fixed top-0 z-40 left-0 w-screen h-full max-h-full bg-black bg-opacity-60"
        onClick={() => togleModal(false)}
      >
        {JSON.stringify(modal)}
      </div>
      <div className="fixed z-50 inset-0 mx-auto my-auto flex flex-col max-w-xl w-10/12 h-3/5 bg-gray-200 border-2 border-gray-700 rounded-b-xl text-gray-700 overflow-x-hidden">
        <div className="flex justify-between">
          <div></div>
          <a
            className="p-4 hover:bg-black hover:bg-opacity-25 cursor-pointer"
            onClick={() => togleModal(false)}
          >
            <svg
              className="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
            </svg>
          </a>
        </div>
        <div className="px-4 py-4">
          <NameForm user={user} mutate={mutate} togleModal={togleModal}/>
        </div>
      </div>
    </div>
  )
}

export default ModalBlock