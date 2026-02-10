const data = require('./doctor_info.json');

function displayDoctorInfo() {
    const doctorInfo = data;
    const fullName = doctorInfo.fullName;
    const specialtyPracticed = doctorInfo.specialtyPracticed;
    const certifications = doctorInfo.certifications;
    const education = doctorInfo.education;

    let specialtyPracticedPreparedData = [];

    for (let i = 0; i < specialtyPracticed.length; i++) {
        specialtyPracticedPreparedData.push();
    }

    console.log(doctorInfo);
}

function search(input = '') {
    // get the first clinicalAreas from the data by substring match on name

    let result = [];

    // console.log(data);
    // console.log(data.length());
    for (let i = 0; i < data.clinicalAreas.length; i++) {

        // const doctorInfo = data[i];
        if (data.clinicalAreas[i].name.includes(input)) {
            result.push(data.clinicalAreas[i]);
        }
    }

    console.log(result);
    return result;

}

search('Diagnostic');

// displayDoctorInfo();