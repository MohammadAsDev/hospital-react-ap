import BarChart from "../../../components/Charts/BarChart";
import LineChart from "../../../components/Charts/LineChart";


export default function Dashboard() {
  // const dispatch = useDispatch();
  // const [postData, setPostData] = useState(null);

  return (
    <>
      <div className="grid md:grid-cols-2 w-full gap-3 h-fit">
        <LineChart />
        <BarChart />
      </div>
    </>
  );
}
