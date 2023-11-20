type ParameterType = {
  first_name: string;
};

export function UserNameHandler(userInfo: ParameterType) {
  let lastLetter = userInfo.first_name?.substring(
    userInfo.first_name.length - 1
  );
  let lastLetterValue =
    (lastLetter == "ا" || lastLetter == "ه" || lastLetter == "و") && "ی";
  let name = lastLetterValue
    ? userInfo?.first_name.trim()
    : `${userInfo?.first_name.trim() + "ِ"}` + " عزیز";

  return name;
}
