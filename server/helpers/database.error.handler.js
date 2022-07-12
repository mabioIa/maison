const getUniqueErrorMessage = (e) => {
  let output;
  try {
    let fieldName = e.message.substring(
      e.message.lastIndexOf(".$") + 2,
      e.message.lastIndexOf("_1")
    );
    output = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
    +" already exists";
  } catch (err) {
    output = "Unique field already exists!";
  }

  return output;
};

const getErrorMessage = (e) => {
  let message = "";
  if (e.code) {
    switch (e.code) {
      case 11000:
      case 11001:
        message = getUniqueErrorMessage(e);
        break;
      default:
        message = "Something went dreadfully wrong!";
    }
  } else {
    for (let name in e.errors) {
      if (e.errors[name].message) message = e.errors[name].message;
    }
  }

  return message;
};

export default { getErrorMessage };
