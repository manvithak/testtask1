function randomString(length, chars) {
                    var result = '';
                    for (var i = length; i > 0; --i) 
                        result += chars[Math.floor(Math.random() * chars.length)];
                    return result;
                    }
                var token = randomString(15, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
                console.log(token);