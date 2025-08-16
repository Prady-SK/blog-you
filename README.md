# Blog Management Dashboard

A **responsive Blog Management Dashboard** built for assessment purposes using **React** and **Material UI v5**. Supports basic CRUD operations with in-memory state management.  

**Live Demo:** [https://kilowott-blog.netlify.app](https://kilowott-blog.netlify.app)

---

## Features

- Dashboard with **blog table** (Title, Author, Date, Status)  
- **Search & Sort** (Title & Date)  
- **Add/Edit/Delete** posts via modal/dialog  
- **View Post Page** with full details  
- **Responsive & Mobile-first design**  
- **Pagination** & **Theme Toggle (Light/Dark)**  
- **LocalStorage persistence**  
- Form **validation** for all fields  
- Basic **test cases** included
- CMS for all labels

---

## Tech Stack

- React (latest) + TypeScript  
- Material UI v5  
- Functional components & hooks (`useState`, `useEffect`)  
- No Redux or backend API  

---

## Best Practices

- Clean, modular, maintainable code  
- `useMemo` for performance  
- Mobile-friendly layout & UX  
- Future accessibility improvements possible  
- Incremental commits reflect real development flow  

---

## Evaluation Checklist

- ✅ **Code clarity & structure** – Modular components, organized folders, TypeScript types  
- ✅ **Material UI usage & theming** – Grid, Table, Dialog, Typography, Theme toggle  
- ✅ **Responsiveness & UX** – Mobile-first layout, wrapping text, dialogs scale, separate view page  
- ✅ **Functional completeness** – CRUD operations, validation, sorting, filtering implemented  
- ✅ **State management & logic** – useState, useEffect, localStorage persistence, useMemo noted for optimization  

## Future Enhancements

- Backend integration for dynamic content  
- Advanced styling & theme options  
- More accessibility (`aria` tags, keyboard navigation)  
- Extended test coverage & performance optimizations  

---

## Installation
Clone the repo
npm i       # Install dependencies
npm run start # Start development server
npm run test  # Run tests
