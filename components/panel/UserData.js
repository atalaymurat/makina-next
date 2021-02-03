import { formingDateShort } from '../../lib/helpers'
import { formatPhoneNumberIntl } from 'react-phone-number-input'

const UserData = ({ user, togleModal, setForm }) => {
  if (user) {
    return (
      <div className="my-1 w-full max-w-lg border border-gray-400 mx-auto rounded px-4 pt-2 pb-4">
        <h1 className="block text-xl font-semibold pb-1">Information</h1>
        <div className="border border-gray-600 flex flex-col">
          <a
            className="flex items-center border-b border-gray-600  hover:bg-gray-800 hover:text-white cursor-pointer"
            onClick={() => {
              togleModal(true)
              setForm('name')
            }}
          >
            <div className="w-4/12 px-2 py-4 font-semibold text-sm">NAME</div>
            <div className="w-6/12 px-2 py-4 text-gray-400">
              {user.name.firstName}
              {user.name.middleName && ` ${user.name.middleName}`}{' '}
              {user.name.lastName}
            </div>
            <div className="w-2/12 px-1 py-4 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                className={`w-6 h-6 mx-auto fill-current
                ${!user.phone.mobile ? 'text-gray-500' : 'text-gray-600'}`}
              >
                <polygon points="16.172 9 10.101 2.929 11.515 1.515 20 10 19.293 10.707 11.515 18.485 10.101 17.071 16.172 11 0 11 0 9" />
              </svg>
            </div>
          </a>

          <a
            className="flex items-center border-b border-gray-600 hover:bg-gray-800 hover:text-white cursor-pointer"
            onClick={() => {
              togleModal(true)
              setForm('phone')
            }}
          >
            <div className="w-4/12 px-2 py-4 font-semibold text-sm">
              GSM TEL
            </div>
            <div className="w-6/12 px-2 py-4 text-gray-400">
              {formatPhoneNumberIntl(user.phone.mobile)}
            </div>
            <div className="w-2/12 px-1 py-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                className={`w-6 h-6 mx-auto fill-current ${
                  !user.phone.mobile ? 'text-gray-500' : 'text-gray-600'
                }`}
              >
                <polygon points="16.172 9 10.101 2.929 11.515 1.515 20 10 19.293 10.707 11.515 18.485 10.101 17.071 16.172 11 0 11 0 9" />
              </svg>
            </div>
          </a>

          <a
            className="flex items-center border-b border-gray-600 hover:bg-gray-800 hover:text-white cursor-pointer"
            onClick={() => {
              togleModal(true)
              setForm('phone')
            }}
          >
            <div className="w-4/12 px-2 py-4 font-semibold text-sm">
              COMPANY TEL
            </div>
            <div className="w-6/12 px-2 py-4 text-gray-400">
              {formatPhoneNumberIntl(user.phone.company)}
            </div>
            <div className="w-2/12 px-1 py-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                className={`w-6 h-6 mx-auto fill-current ${
                  !user.phone.mobile ? 'text-gray-500' : 'text-gray-600'
                }`}
              >
                <polygon points="16.172 9 10.101 2.929 11.515 1.515 20 10 19.293 10.707 11.515 18.485 10.101 17.071 16.172 11 0 11 0 9" />
              </svg>
            </div>
          </a>
          {/*  USER PASSWORD FIELD ONLY FOR LOCAL ACCOUNTS */}
          {user.methods.length && user.methods.includes('local') && (
            <a
              className="flex items-center border-b border-gray-600 hover:bg-gray-800 hover:text-white cursor-pointer"
              onClick={() => {
                togleModal(true)
                setForm('password')
              }}
            >
              <div className="w-4/12 px-2 py-4 font-semibold text-sm">
                PASSWORD
              </div>
              <div className="w-6/12 px-2">
                <div className="text-sm text-gray-400">*******</div>
                <div className="text-xs text-green-500">
                  last changed at {formingDateShort(user.local.passChanged)}
                </div>
              </div>
              <div className="w-2/12 px-1 py-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  className={`w-6 h-6 mx-auto fill-current ${
                    !user.local.passChanged ? 'text-red-700' : 'text-gray-600'
                  }`}
                >
                  <polygon points="16.172 9 10.101 2.929 11.515 1.515 20 10 19.293 10.707 11.515 18.485 10.101 17.071 16.172 11 0 11 0 9" />
                </svg>
              </div>
            </a>
          )}
        </div>
      </div>
    )
  } else {
    return null
  }
}

export default UserData
