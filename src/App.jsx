import { useEffect, useState } from "react"
import useCrudApi from "./hooks/useCrudApi"
import { use } from "react"
//https://users-crud-api-production-9c59.up.railway.app//api/v1/users

const initialValues = {
  fisrt_name: '',
  last_name: '',
  email: '',
  password: '',
  birthday: '',
  image_url: ''
}

const baseUrl = '/https://users-crud-api-production-9c59.up.railway.app//api/v1/'

function App() {
  const { request, data: users, pending, error } = useCrudApi()
  const [values, setValues] = useState(initialValues)
  const [edit, setEdit] = useState(null)

  //const [fisrtName, setFirstName] = useState('')
  //const [lastName, setLastName] = useState('')
  //const [email, setEmail] = useState('')
  //const [password, setPassword] = useState('')
  //const [birthday, setBirthday] = useState('')
  //const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    request({ url: baseUrl + 'users'})
  }, [])

  const add = (user) => {
    request({
      url: baseUrl + 'users',
      method: 'POST',
      body: user
    })
  }
  
  const update = (id, userEdit) => { }

  const remove = (id) => {
    request({
      url: baseUrl + `users/${id}`,
      method: 'DELETE',
      id
    })
   }

  const handleChange = ({ name, value }) => {
    setValues({
      ...values,
      [name]: value
    })
  }

  const handleEdit = (user) => {

  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(
      {
        fisrt_name: fisrtName,
        last_name: lastName,
        email,
        password,
        birthday,
        image_url: imageUrl
      }
    )
  }

  return (
    <dir>
      <form className='w-64 px-4 mt5'>
        <div className='mb-4'>
          <label className="label">
          Fisrt Name
            <input className='input' 
              type="text"
              name='first_name'
              value={values.fisrt_name}
              onChange={(e) => setFirstName(e.target)}
             />
          </label>
        </div>
        <div className='mb-4'>
          <label className="label">
          Last Name
            <input className='input' 
              type="text"
              name='last_name'
              value={values.last_name}
              onChange={(e) => setLastName(e.target)}
            />
          </label>
        </div>
        <div className='mb-4'>
          <label className="label">
          Email
            <input className='input'
             type="email"
             name='email'
             value={values.email}
             onChange={(e) => setEmail(e.target)}
            />
          </label>
        </div>
        <div className='mb-4'>
        <label className="label">
          Password
            <input className='input'
             type="password"
             name='password'
             value={values.password}
             onChange={(e) => setPassword(e.target)}
            />
          </label>
        </div>
        <div className='mb-4'>
          <label className="label">
          Birthday
            <input className='input'
             type="date"
             name='birthday'
             value={values.birthday}
             onChange={(e) => setBirthday(e.target)}
            />
          </label>
        </div>
        <div>
          <label className="label">
          Image URL
            <input className='input'
             type="text"
             name='image_Url'
             value={values.image_Url}
             onChange={(e) => setImageUrl(e.target)} 
            />
          </label>
        </div>
        <button type='submit' className='btn bg-blue-600 text-white'> 
          {edit ? 'Edit' : 'Create'}
        </button>
      </form>

      {pending ? <p>Loading...</p> :
      <ul className='mt-5 px-4'>
        {users && users.map(user =>
          <li key ={user.id} className='mb-3'>
            {user.first_name}
            <button 
              onClick={() => handleEdit(user)}
              className='btn bg-gray-200 mx-2'>
              Edit
            </button>
            <button 
              onClick={() => remove(user.id)}
              className='btn bg-red-500 text-white'>
              Delete
            </button>
            </li>
        )}
      </ul>
    }
    </dir>
  
  )
}

export default App
