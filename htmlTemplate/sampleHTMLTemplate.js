const htmlTemplate = `<html>
<head>
    <title>{{ name }}'s Information</title>
</head>
<body>
    <h1>Contact Information</h1>
    <p><strong>Name:</strong> {{ name }}</p>
    <p><strong>Phone:</strong> {{ phone }}</p>
    <p><strong>Email:</strong> {{ email }}</p>
    <p><strong>ID:</strong> {{ id }}</p>
    <p><strong>Age:</strong> {{ age }}</p>
</body>
</html>
`

module.exports = {
    htmlTemplate
}