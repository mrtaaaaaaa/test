// User Panel
import UserAdsPage from "@/Pages/Panel/User/UserAds";

// Admin Panel
import AdList from "@/Pages/Panel/Admin/AdsList";
import CarInstallmentDetails from "@/Pages/Panel/Admin/CarInstallmentDetails";
import CarInstallmentRequestsPage from "@/Pages/Panel/Admin/CarInstallmentRequsets";
import NormalCarOrderRequestsPage from "@/Pages/Panel/Admin/Normal/NormalCarOrderRequsets";
import NormalCarSaleRequestsPage from "@/Pages/Panel/Admin/Normal/NormalCarSaleRequsets";
import CarPricing from "@/Pages/Panel/Admin/Pricing";
import AdminSendMessagePage from "@/Pages/Panel/Admin/SendMessage";
import AdminVehicleCheck from "@/Pages/Panel/Admin/VehicleCheck";
import VipCarOrderReqests from "@/Pages/Panel/Admin/Vip/VipCarOrderRequsets";
import VipCarSaleRequestsPage from "@/Pages/Panel/Admin/Vip/VipCarSaleRequsets";

// SuperAdmin Panel
import ChangeRole from "@/Pages/Panel/SuperAdmin/ChangeRole";
import AdminExpirationDatePage from "@/Pages/Panel/SuperAdmin/ExpirationDate";

import { LayoutPanel } from "Components/Panel/Layout";
import DeterminCosts from "Pages/Panel/Admin/Exhibitor/determinCosts";
import FirstValidation from "Pages/Panel/Admin/Exhibitor/firstValidation";
import GuarantorsDocs from "Pages/Panel/Admin/Exhibitor/guarantorsDocs";
import LeasingRequests from "Pages/Panel/Admin/Exhibitor/leasingRequests";
import MaximumLoanPay from "Pages/Panel/Admin/Exhibitor/maximumLoanPay";
import OnlineContract from "Pages/Panel/Admin/Exhibitor/onlineContract";
import UploadedChecksInfo from "Pages/Panel/Admin/Exhibitor/uploadedChecksInfo";
import AdminExhibitorsRequests from "Pages/Panel/Admin/ExhibitorsRequest";
import ContinueExhibitionRegister from "Pages/Panel/Exhibitors/continueExhibitionRegister";
import CustomerCarInfo from "Pages/Panel/Exhibitors/leasing/customerCarInfo";
import CustomerDocument from "Pages/Panel/Exhibitors/leasing/customerDocument";
import CustomerOnlineContract from "Pages/Panel/Exhibitors/leasing/customerOnlineContract";
import CustomerPersonalInfo from "Pages/Panel/Exhibitors/leasing/customerPersonalInfo";
import CustomerTableStatus from "Pages/Panel/Exhibitors/leasing/customerTableStatus";
import CustomerUploadCheck from "Pages/Panel/Exhibitors/leasing/customerUploadCheck";
import CustomerGuarantorInfo from "Pages/Panel/Exhibitors/leasing/guarantors/customerGuarantorInfo";
import CustomerGuarantorsSelection from "Pages/Panel/Exhibitors/leasing/guarantors/customerGuarantorsSelection";
import LoanMaxAmount from "Pages/Panel/Exhibitors/leasing/loanMaxAmount";
import ReqInstallment from "Pages/Panel/Exhibitors/leasing/reqInstallment";
import SellerAccountNumber from "Pages/Panel/Exhibitors/leasing/sellerAccountNumber";
import VehicleCheckForIntsllment from "Pages/Panel/Exhibitors/leasing/vehicleCheck";
import MyRequests from "Pages/Panel/Exhibitors/myRequests";
import { parseJwt } from "./jwt";
import CustomerGuarantorsInfo from "Pages/Panel/Exhibitors/leasing/guarantors/customerGuarantorsInfo";
import CustomerDetermineCost from "Pages/Panel/Exhibitors/leasing/cutomerDetermineCost";
import UserGeneralFolderInformation from "Pages/Panel/Admin/Exhibitor/userGeneralFolderInformation";
import ChecksDetail from "Pages/Panel/Admin/Exhibitor/checksDetail";
import { checkExistWindow } from "./check-exist-window";

export default function getRouteAccesses() {
  const token =
    checkExistWindow() &&
    JSON.parse(window.localStorage.getItem("userToken") ?? "{}");

  const routes = [
    {
      permission: ["OperationsDirector"],
      routes: [
        {
          path: "ads",
          element: (
            <LayoutPanel>
              <UserAdsPage />
            </LayoutPanel>
          ),
        },
        {
          path: "list",
          element: (
            <LayoutPanel>
              <AdList />
            </LayoutPanel>
          ),
        },
        {
          path: "normal/car-sale",
          element: (
            <LayoutPanel>
              <NormalCarSaleRequestsPage />
            </LayoutPanel>
          ),
        },
        {
          path: "normal/car-order",
          element: (
            <LayoutPanel>
              <NormalCarOrderRequestsPage />
            </LayoutPanel>
          ),
        },
        {
          path: "vip/car-order",
          element: (
            <LayoutPanel>
              <VipCarOrderReqests />
            </LayoutPanel>
          ),
        },
        {
          path: "vip/car-sale",
          element: (
            <LayoutPanel>
              <VipCarSaleRequestsPage />
            </LayoutPanel>
          ),
        },
        {
          path: "message",
          element: (
            <LayoutPanel>
              <AdminSendMessagePage />
            </LayoutPanel>
          ),
        },
        {
          path: "leasing-requests",
          element: (
            <LayoutPanel>
              <LeasingRequests />
            </LayoutPanel>
          ),
        },
        {
          path: "vehicle-checks",
          element: (
            <LayoutPanel>
              <AdminVehicleCheck />
            </LayoutPanel>
          ),
        },
        {
          path: "car-installment",
          element: (
            <LayoutPanel>
              <CarInstallmentRequestsPage />
            </LayoutPanel>
          ),
        },
        {
          path: "car-installment/:id",
          element: (
            <LayoutPanel>
              <CarInstallmentDetails />
            </LayoutPanel>
          ),
        },
        {
          path: "car-pricing",
          element: (
            <LayoutPanel>
              <CarPricing />
            </LayoutPanel>
          ),
        },
        {
          path: "exhibitors/requests",
          element: (
            <LayoutPanel>
              <AdminExhibitorsRequests />
            </LayoutPanel>
          ),
        },
        {
          path: "maximum-loan/:id",
          element: (
            <LayoutPanel>
              <MaximumLoanPay />
            </LayoutPanel>
          ),
        },
        {
          path: "confirm-guarantors-docs/:id",
          element: (
            <LayoutPanel>
              <GuarantorsDocs />
            </LayoutPanel>
          ),
        },
        {
          path: "checks-info/:id",
          element: (
            <LayoutPanel>
              <UploadedChecksInfo />
            </LayoutPanel>
          ),
        },
        {
          path: "determin-costs/:id",
          element: (
            <LayoutPanel>
              <DeterminCosts />
            </LayoutPanel>
          ),
        },
        {
          path: "online-contract/:id",
          element: (
            <LayoutPanel>
              <OnlineContract />
            </LayoutPanel>
          ),
        },
        {
          path: "checks-detail",
          element: (
            <LayoutPanel>
              <ChecksDetail />
            </LayoutPanel>
          ),
        },
        {
          path: "user-general/:id",
          element: (
            <LayoutPanel>
              <UserGeneralFolderInformation />
            </LayoutPanel>
          ),
        },
        {
          path: "fristValidation/:id",
          element: (
            <LayoutPanel>
              <FirstValidation />
            </LayoutPanel>
          ),
        },
        {
          path: "exhibitor/installment/customers/reqeuset-list",
          element: (
            <LayoutPanel>
              <AdminExhibitorsRequests />
            </LayoutPanel>
          ),
        },
      ],
    },
    {
      permission: ["Exhibitors"],
      routes: [
        {
          path: "requests",
          element: (
            <LayoutPanel>
              <MyRequests />
            </LayoutPanel>
          ),
        },

        {
          path: "installment/customer/requset",
          element: (
            <LayoutPanel>
              <ReqInstallment />
            </LayoutPanel>
          ),
        },
        {
          path: "installment/customers/request-list",
          element: (
            <LayoutPanel>
              <CustomerTableStatus />
            </LayoutPanel>
          ),
        },
        {
          path: "installment/customers/request-list/personal-form/:leasingId",
          element: (
            <LayoutPanel>
              <CustomerPersonalInfo />
            </LayoutPanel>
          ),
        },
        {
          path: "/panel/exhibitor/leasing/upload-document",
          element: (
            <LayoutPanel>
              <CustomerDocument />
            </LayoutPanel>
          ),
        },
        {
          path: "installment/customers/requset-list/car-info/:leasingId",
          element: (
            <LayoutPanel>
              <CustomerCarInfo />
            </LayoutPanel>
          ),
        },
        {
          path: "installment/customers/request-list/vehicle-check/:leasingId",
          element: (
            <LayoutPanel>
              <VehicleCheckForIntsllment />
            </LayoutPanel>
          ),
        },
        {
          path: "installment/customers/request-list/upload-check/:leasingId",
          element: (
            <LayoutPanel>
              <CustomerUploadCheck />
            </LayoutPanel>
          ),
        },
        {
          path: "installment/customers/request-list/customer-guarantors-select/:leasingId",
          element: (
            <LayoutPanel>
              <CustomerGuarantorsSelection />
            </LayoutPanel>
          ),
        },
        {
          path: "installment/customers/request-list/customer-guarantors-selected-form/:leasingId",
          element: (
            <LayoutPanel>
              <CustomerGuarantorInfo />
            </LayoutPanel>
          ),
        },
        {
          path: "installment/customers/request-list/customer-online-contract/:leasingId",
          element: (
            <LayoutPanel>
              <CustomerOnlineContract />
            </LayoutPanel>
          ),
        },
        {
          path: "installment/customers/request-list/seller-account-number/leasingId",
          element: (
            <LayoutPanel>
              <SellerAccountNumber />
            </LayoutPanel>
          ),
        },
        {
          path: "installment/customers/request-list/customer-guarantors-info/:leasingId",
          element: (
            <LayoutPanel>
              <CustomerGuarantorsInfo />
            </LayoutPanel>
          ),
        },
        {
          path: "installment/customers/request-list/loan-amout/:leasingId",
          element: (
            <LayoutPanel>
              <LoanMaxAmount />
            </LayoutPanel>
          ),
        },
        {
          path: "installment/customers/request-list/determine-cost/:leasingId",
          element: (
            <LayoutPanel>
              <CustomerDetermineCost />
            </LayoutPanel>
          ),
        },
        {
          path: "register",
          element: (
            <LayoutPanel>
              <ContinueExhibitionRegister />
            </LayoutPanel>
          ),
        },
      ],
    },
    {
      permission: ["SuperAdmin"],
      routes: [
        {
          path: "change-role",
          element: (
            <LayoutPanel>
              <ChangeRole />
            </LayoutPanel>
          ),
        },
        {
          path: "expiration-date",
          element: (
            <LayoutPanel>
              <AdminExpirationDatePage />
            </LayoutPanel>
          ),
        },
      ],
    },
  ];

  const tokenInfo = token ? parseJwt(token) : "";

  const routeAccess = token
    ? routes.filter((item) =>
        item.permission.some((role) => tokenInfo.roles.includes(role))
      )
    : [];

  return routeAccess;
}
