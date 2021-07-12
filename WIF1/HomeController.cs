    return responseMessage.WriteFormPost();
        }
        private static void ProcessSignOut(Uri uri, ClaimsPrincipal user, HttpResponse response)
        {
            // Prepare url to internal logout page (which signs-out of all relying parties).
            string url = uri.OriginalString;
            int index = url.IndexOf("&wreply=");
            if (index != -1)
            {
                index += 8;
                string baseUrl = url.Substring(0, index);
                string wreply = url.Substring(index, url.Length - index);
                
                // Get the base url (domain and port).
                string strPathAndQuery = uri.PathAndQuery;
                string hostUrl = uri.AbsoluteUri.Replace(strPathAndQuery, "/");

                wreply = HttpUtility.UrlEncode(hostUrl + "logout?wreply=" + wreply);

                url = baseUrl + wreply;
            }

            // Redirect user to logout page (which signs out of all relying parties and redirects back to originating relying party).
            uri = new Uri(url);

            var requestMessage = (SignOutRequestMessage)WSFederationMessage.CreateFromUri(uri);
            FederatedPassiveSecurityTokenServiceOperations.ProcessSignOutRequest(requestMessage, user, requestMessage.Reply, response);        }
    }
}
