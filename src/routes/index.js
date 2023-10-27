import LayoutDefault from '../layouts/LayoutDefault/layoutDefault.js'
import Home from '../pages/Home/index'  

export const routes = [
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        index: true,
        element: <Home />
      }
    ]
  }
]