from node:alpine
workdir /app

#install appp dependecies
copy package.json ./
copy package-lock.json ./
run npm install

# add app
copy . ./

# start app
cmd ["npm", "start"]