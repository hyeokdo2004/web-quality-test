const fs = require("fs");
const path = require("path");

exports.handler = async function(event, context) {
  // ✅ 수정된 파일 경로: Netlify 배포 환경에서도 루트 기준으로 접근 가능
  const filePath = path.join(process.cwd(), "files", "brokenDocument.xlsx");

  try {
    const fileContent = fs.readFileSync(filePath);

    return {
      // 400번대 상태 코드 (QA 용)
      statusCode: 404, 
      headers: {
        // 첨부파일 형식 지정
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": "attachment; filename=brokenDocument.xlsx"
      },
      // 파일 내용을 base64로 인코딩
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
