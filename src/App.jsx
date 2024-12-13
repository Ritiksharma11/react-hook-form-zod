import React from 'react'
import './App.css'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const App = () => {
  const schema = z.object({
    firstName: z.string().min(3).max(25),
    lastName: z.string().min(3).max(25),
    email: z.string().email(),
    age: z.number().min(18).nonnegative(),
    password: z.string().min(6).max(20),
    confirmPassword: z.string().min(6).max(20),
  }).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ["confirmPassword"]
  })

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) })

  const submitData = (data) => {
    console.log("Data", data);
  }

  return (
    <div>
      <form onSubmit={handleSubmit(submitData)}>
        <label>FirstName:</label>
        <input type="text" {...register('firstName')} />
        {errors.firstName && <span>{errors.firstName.message}</span>}

        <label>LastName:</label>
        <input type="text" {...register('lastName')} />
        {errors.lastName && <span>{errors.lastName.message}</span>}

        <label>Email:</label>
        <input type="email" {...register('email')} />
        {errors.email && <span>{errors.email.message}</span>}

        <label>Age:</label>
        <input type="number" {...register('age', { valueAsNumber: true })} />
        {errors.age && <span>{errors.age.message}</span>}

        <label>Password:</label>
        <input type="password" {...register('password')} />
        {errors.password && <span>{errors.password.message}</span>}

        <label>Confirm Password:</label>
        <input type="password" {...register('confirmPassword')} /> <br />
        {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}

        <input type="submit" />
      </form>
    </div>
  )
}

export default App
