import IranSans from "@/assets/fonts/ttf/IRANSansWebFaNum.ttf";

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
    fontSize: "14px",
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
  pageTitle: {
    color: "#1242E0",
    fontWeight: "bold",
    textAlign: "center",
    paddingBottom: "10px",
    fontSize: "16px",
    fontWeight: "bold",
    display: "flex",
    flexDirection: "row-reverse",
  },
  flex: {
    display: "flex",
  },
});

function ReportTemplate(result) {
  const data = result.result.result;
  return (
    <Document style={styles.document}>
      {data.map((category) => (
        <Page style={styles.page} size="A4">
          <View style={styles.flex}>
            <Text style={styles.pageTitle}>
              {result.result.brand_and_model}
              {" - "}
              نتیجه کارشناسی خودرو
            </Text>
          </View>
          <Text style={styles.title}>{category.category}</Text>

          {category.data.map((item) => {
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

          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={{ fontWeight: "bold" }}>امتیاز کل</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableTitle}>{category.score}</Text>
            </View>
          </View>
        </Page>
      ))}
    </Document>
  );
}

class PdfReport extends React.Component {
  renderPDF = (result) => (
    <PDFDownloadLink
      document={<ReportTemplate result={result} />}
      fileName="نتیجه کارشناسی خودرو.pdf"
    >
      {({ blob, url, loading, error }) =>
        loading ? (
          "Loading document..."
        ) : (
          <button className="text-xs flex items-center justify-center text-white  bg-blue py-2 rounded-lg xl:w-4/5 w-full mx-auto">
            دانلود نسخه pdf
          </button>
        )
      }
    </PDFDownloadLink>
  );

  render() {
    const { result } = this.props;
    return <div className="w-full">{this.renderPDF(result)}</div>;
  }
}

export default PdfReport;
