import LayoutDefault from '../layouts/LayoutDefault/layoutDefault'
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