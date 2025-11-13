const fs = require("fs");
const path = require("path");

exports.handler = async function(event, context) {
  // Netlify 배포 루트 기준 files 폴더
  const filePath = path.join(process.cwd(), "files", "brokenDocument.xlsx");

  try {
    const fileContent = fs.readFileSync(filePath);

    return {
      // QA용 400번대 상태 코드
      statusCode: 404,
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": "attachment; filename=brokenDocument.xlsx"
      },
      body: fileContent.toString("base64"),
      isBase64Encoded: true
    };

  } catch (err) {
    console.error("파일 읽기 실패:", err);
    return {
      statusCode: 500,
      body: "파일 읽기 실패"
    };
  }
};
