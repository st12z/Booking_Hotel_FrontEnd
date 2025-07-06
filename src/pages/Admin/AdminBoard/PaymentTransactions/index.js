import ChartAmountPaymentTransaction from "../../../../components/ChartAmountPaymentTransaction";
import ChartRevenuePaymentTransaction from "../../../../components/ChartRevenuePaymentTransaction";
import PieChartPaymentTransaction from "../../../../components/PieChartPaymentTransaction";
import "./PaymentTransactions.scss"
function PaymentTransactions(){
  return(
    <>
      <div className="chart-transaction">
        <ChartAmountPaymentTransaction />
        <ChartRevenuePaymentTransaction/>
        <PieChartPaymentTransaction/>
      </div>
    </>
  )
}
export default PaymentTransactions;