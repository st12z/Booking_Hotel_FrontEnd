import ChartAmountPaymentTransaction from "../../../../components/ChartAmountPaymentTransaction";
import ChartRevenuePaymentTransaction from "../../../../components/ChartRevenuePaymentTransaction";
import ListPaymentTransaction from "../../../../components/ListPaymentTransaction";
import PieChartPaymentTransaction from "../../../../components/PieChartPaymentTransaction";
import "./PaymentTransactions.scss"
function PaymentTransactions(){
  return(
    <>
      <div className="chart-transaction" style={{marginBottom:"40px"}}>
        <ChartAmountPaymentTransaction />
        <ChartRevenuePaymentTransaction/>
        <PieChartPaymentTransaction/>
      </div>
      <div className="statistic-transaction">
        <ListPaymentTransaction />
      </div>
    </>
  )
}
export default PaymentTransactions;