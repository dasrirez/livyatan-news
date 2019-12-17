//<a href="https://www.freepik.com/free-photos-vectors/background">Background photo created by rawpixel.com - www.freepik.com</a>
//<a href="https://www.freepik.com/free-photos-vectors/sport">Sport photo created by freepik - www.freepik.com</a>
//<a href="https://www.freepik.com/free-photos-vectors/business">Business photo created by mindandi - www.freepik.com</a>
//<a href="https://www.freepik.com/free-photos-vectors/business">Business photo created by rawpixel.com - www.freepik.com</a>
//<a href="https://www.freepik.com/free-photos-vectors/background">Background photo created by freepik - www.freepik.com</a>
//<a href="https://www.freepik.com/free-photos-vectors/technology">Technology photo created by jannoon028 - www.freepik.com</a>
import businessImg from '../../src/media/business.jpg'
import entertainmentImg from '../../src/media/entertainment.jpg'
import generalImg from '../../src/media/general.jpg'
// import healthImg from '../../src/media/health.jpg'
import scienceImg from '../../src/media/science.jpg'
import sportsImg from '../../src/media/sports.jpg'
import technologyImg from '../../src/media/technology.jpg'
export default function () {
  return [
    {
      id: 1,
      type: "business",
      img: businessImg,
    },
    {
      id: 2,
      type: "entertainment",
      img: entertainmentImg,
    },
    {
      id: 3,
      type: "general",
      img: generalImg,
    },
//    {
//      id: 4,
//      type: "health",
//      img: healthImg,
//    },
    {
      id: 5,
      type: "science",
      img: scienceImg
    },
    {
      id: 6,
      type: "sports",
      img: sportsImg,
    },
    {
      id: 7,
      type: "technology",
      img: technologyImg,
    },
  ]
}
