/**
 * TASK 1
 * use values from inputString and dictionary and return all combinations how can inputString be split using dictionary
 * @param inputString contains string which need to be split
 * @param dictionary contains array of words to use for split)
 */
const getCombinations = (
  inputString /*: string*/ = "417427194451417",
  dictionary /*: string[]*/ = ["94451", "417", "94451417", "4271", "427194451"]
) => {
  const getPermutations = (xs) => {
    if (!xs.length) return [[]];
    return xs.flatMap((x) => {
      return getPermutations(xs.filter((v) => v !== x)).map((vs) => [x, ...vs]);
    });
  };

  return getPermutations(dictionary)
    .flatMap((s) => s.join(":"))
    .filter((m) => m.replace(/:/g, "").indexOf(inputString) > -1);

  // TO DO: join string split from beginning and end of occuring indexes
  // match above split to array "":"" and remove then rejoin hmmm I'd love to see and test a working example of this question have a feeling
};

//usage ley x = getCombinations(); or let y = getCombinations("ABCDXYZ", ["AB", "CD", "XYZ", "ABCD", "XYZ"])

/**
 * TASK 2
 */
class Provider {
  /**
   * Gets the weather for a given city
   */
  static getWeather(city) {
    return Promise.resolve(`The weather of ${city} is Cloudy`);
  }
  /**
   * Gets the weather for a given city
   */
  static getLocalCurrency(city) {
    return Promise.resolve(`The local currency of ${city} is GBP`);
  }
  /**
   * Given Longtitude and latitude, this function returns a city
   */
  static findCity(long, lat) {
    return Promise.resolve(`London`);
  }
}

async function getCityDetails() {
  //Find and print in console the city located at latitude/longitude 51.5074/0.1278 accordingly
  const city: string = await Provider.findCity(51.5074, 0.1278);

  //Print in console the weather for the city located at latitude/longitude 51.5074/0.1278 accordingly
  console.log(city);

  //Print in console in one line the weather and currency for city = London
  const weather: string = await Provider.getWeather(city);
}

/**
 * TASK 3
 */
interface responseObject {
  title: string;
  message?: string;
}
interface responseData {
  state: "processing" | "error" | "success"; // state to goto
  errorCode?: "NO_STOCK" | "INCORRECT_DETAILS" | null | undefined; // optional error code
}

/**
 * You have been tasked with creating a helper function that will be used to determine the output of an array of data.
 * @param data array of cast type {state: string, errorCode: string}
 */
async function getOutput(data) {
  // TypeScript (data: responseData[])
  const genericResolver = (
    d // TypeScript (d: responseData)
  ) =>
    new Promise((resolve, reject) => {
      let rs; // TypeScript rs: responseObject;
      switch (d.state) {
        case "success":
          rs = {
            title: "Order complete",
            message: null,
          };
          resolve(rs);
          break;
        case "processing":
          // execution should be delayed by 2 seconds, then fetch the next state
          setTimeout(resolve, 2000);
          break;

        // assuming last state available is only error
        default:
          // could set *rs.title="Error page" globally here but for redeability
          switch (d.errorCode) {
            case "NO_STOCK":
              rs = {
                title: "Error page",
                message: "No stock has been found",
              };
              break;
            case "INCORRECT_DETAILS":
              rs = {
                title: "Error page",
                message: "Incorrect details have been entered",
              };
              break;
            // null or undefined
            default:
              rs = { title: "Error page", message: null };
              break;
          }
          reject(rs);
          break;
      }
    });

  for await (const iterator of data.map(
    async (rData) => await genericResolver(rData) // TypeScript (rData: responseData)
  )) {
    if (iterator) {
      console.log(iterator);
    }
  }
}

// paste below in chrome console to test
getOutput([{ state: "processing" }, { state: "success" }]);

/**
 * TASK 4
 * Finding it hard understanding requirements as written in the word doc
 * **QUESTION 1**
 * Implement a widget from Project A which shows
 * -Position of virtual car per sec / sec interval re-evaluate position
 * -Fuel consumption displayed / polled per sec
 * -Show alert or message when too much fuel is consumed (i.e. when fuel tank below say 1/4 tank or some defined metric?)
 */

// Code review below

// 1. Use modular css / scss colour, font-size etc in widget.module.scss import into header e.g import style from 'widget.module.scss'
// usage className = {style.header}

// haven't used React.Component in a while use functional components these days with hooks BUT

// We have't touched on HTML and layouts but if this is a widget I'd implement as <section /> i.e. accessibility group will be able to tab through
// Reduce multiple H1's and use <divs /> within section. Run accessibilty on mac or windows and render single or multiple of these
// When reading out as headers it will continually be read out loud and become un-usable (accessibility).
// see video "accessibility.mov" or "accessibility.mp4"

// separation of concerns will separate CarsFuel, Alert into diffenernt jsx files e.g. export function CarsFuel
// CarsFuel: i'd suggest no inline style as above and maybe keep consistency const fuel = props.fuel; to pass required prop through e.g  <CarsFuel fuel={fuel}></CarsFuel>

// Atert: const [state, setState] = useState(0); i'd use props.fuel, and export in array of what should be watched by useEffect e.g.
// useEffect(() => ..., [fuel])
// function in useEffect else condition should re-set to 0
// for conditional render if (state) changed to (!!state) boolean type cast

//App: in updateCoordinates i'd add reference to setInterval e.g. this.timerID = setInterval... and clear in componentWillUnmpunt e.g.  if (this.timerID) {clearInterval(this.timerID);}
