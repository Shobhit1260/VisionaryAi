import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import Dashboard from './Pages/Dashboard'
import Layout from './Pages/Layout'
import BlogArticle from './Pages/BlogArticle'
import Community from './Pages/Community'
import GenerateImages from './Pages/GenerateImages'
import RemoveBackground from './Pages/RemoveBackground'
import ReviewResume from './Pages/ReviewResume'
import WriteArticle from './Pages/WriteArticle'
import RemoveObject from './Pages/RemoveObject'

function App() {
  return (
    <div>
      <Routes> 
         <Route path='/' element={<Home/>}/>
        <Route path='/ai' element={<Layout/>}>
         <Route index element={<Dashboard/>}/>
         <Route path='blog-titles' element={<BlogArticle/>}/>
         <Route path='community' element={<Community/>}/>
         <Route path='generate-images' element={<GenerateImages/>}/>
         <Route path='remove-background' element={<RemoveBackground/>}/>
         <Route path='remove-object' element={<RemoveObject/>}/>
         <Route path='review-resume' element={<ReviewResume/>}/>
         <Route path='write-article' element={<WriteArticle/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
