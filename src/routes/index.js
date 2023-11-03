import LayoutDefault from '../layouts/LayoutDefault/layoutDefault.js'
import Home from '../pages/Home/index'  
import Ranking from '../pages/Ranking/index.js'

export const routes = [
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "/ranking",
        element: <Ranking />
      }
    ]
  }
]