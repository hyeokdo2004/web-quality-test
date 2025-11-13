const fs = require("fs");
const path = require("path");

exports.handler = async function(event, context) {
  const filePath = path.join(process.cwd(), "files", "brokenDocument.xlsx");

  try {
    const fileContent = fs.readFileSync(filePath);

    return {
      statusCode: 404, // QA용 400번대 상태 코드
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": "attachment; filename=brokenDocument.xlsx"
      },
      body: fileContent.toString("base64"),
      isBase64Encoded: true
    };

  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: "파일 읽기 실패"
    };
  }
};
