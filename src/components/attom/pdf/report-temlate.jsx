"use client";
// import IranSans from "@/public/fonts/iranSansRegular.ttf";
import IranSans from "@/assets/fonts/IranSans.ttf";
import {
  Document,
  Font,
  PDFDownloadLink,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import React from "react";

Font.register({
  family: "IranSans",
  format: "truetype", // 1
  src: IranSans,
});

const styles = StyleSheet.create({
  document: {
    padding: "15px",
  },
  page: {
    fontFamily: "IranSans", // 2
    border: "1px solid black",
    padding: "20px",
    fontSize: "12px",
    color: "#372B01",
    textAlign: "right",
    border: "1px solid #1242E0",
    borderRadius: "15px",
  },
  title: {
    color: "#1242E0",
    fontWeight: "bold",
    textAlign: "center",
    borderBottom: "1px solid #1242E0",
    paddingBottom: "10px",
    fontSize: "16px",
  },
  table: {
    display: "table",
    width: "auto",
  },
  tableRow: {
    margin: "5px auto",
    flexDirection: "row",
  },
  tableCol: {
    width: "40%",
    borderStyle: "solid",
    borderBottom: "1px solid #DDDDDD",
    padding: "10px 15px",
  },
  tableTitle: {
    fontSize: 10,
  },
  tableStatus: {
    fontWeight: "bold",
    color: "#1242E0",
  },
});

function ReportTemplate(data) {
  const ShowData = Object.values(data);
  let carFuselage = Object.values(ShowData[0].carFuselageScore);
  let carInnerSystem = Object.values(ShowData[0].carInnerSystemScore);
  let carEngine = Object.values(ShowData[0].carEngineScore);
  let carSuspensionsSystem = Object.values(
    ShowData[0].carSuspensionsSystemScore
  );

  return (
    <Document style={styles.document}>
      <Page style={styles.page} size="A4">
        <Text style={styles.title}>اطلاعات بدنه و لاستیک</Text>
        {carFuselage.map((item) => {
          return (
            typeof item !== "number" &&
            typeof item !== "string" && (
              <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableStatus}>{item.status}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableTitle}>{item.title}</Text>
                </View>
              </View>
            )
          );
        })}
      </Page>

      <Page style={styles.page} size="A4">
        <Text style={styles.title}>اطلاعات سیستم برقی و داخلی</Text>
        {carInnerSystem.map((item) => {
          return (
            typeof item !== "number" &&
            typeof item !== "string" && (
              <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableStatus}>{item.status}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableTitle}>{item.title}</Text>
                </View>
              </View>
            )
          );
        })}
      </Page>

      <Page style={styles.page} size="A4">
        <Text style={styles.title}>اطلاعات موتور</Text>
        {carEngine.map((item) => {
          return (
            typeof item !== "number" &&
            typeof item !== "string" && (
              <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableStatus}>{item.status}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableTitle}>{item.title}</Text>
                </View>
              </View>
            )
          );
        })}
      </Page>

      <Page style={styles.page} size="A4">
        <Text style={styles.title}>اطلاعات سیستم تعلیق</Text>
        {carSuspensionsSystem.map((item) => {
          return (
            typeof item !== "number" &&
            typeof item !== "string" && (
              <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableStatus}>{item.status}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableTitle}>{item.title}</Text>
                </View>
              </View>
            )
          );
        })}
      </Page>
    </Document>
  );
}

class PdfComponent extends React.Component {
  renderPDF = (
    carFuselageScore,
    carInnerSystemScore,
    carEngineScore,
    carSuspensionsSystemScore
  ) => (
    <PDFDownloadLink
      document={
        <ReportTemplate
          data={{
            carFuselageScore,
            carInnerSystemScore,
            carEngineScore,
            carSuspensionsSystemScore,
          }}
        />
      }
      fileName="report.pdf"
    >
      {({ blob, url, loading, error }) =>
        loading ? (
          "Loading document..."
        ) : (
          <button className="bg-blue  border text-white text-sm px-5 py-2 rounded-lg flex gap-2">
            دانلود نسخه pdf
          </button>
        )
      }
    </PDFDownloadLink>
  );

  render() {
    const {
      carFuselageScore,
      carInnerSystemScore,
      carEngineScore,
      carSuspensionsSystemScore,
    } = this.props;
    return (
      <div>
        {this.renderPDF(
          carFuselageScore,
          carInnerSystemScore,
          carEngineScore,
          carSuspensionsSystemScore
        )}
      </div>
    );
  }
}

export default PdfComponent;
